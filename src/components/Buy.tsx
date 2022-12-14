import { Button, Chip, IconButton, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { NFTContract } from "../connectors/address";
import abi from "../abi/abi.json";
import { formatUnits, parseUnits } from "@ethersproject/units";

export const Buy = () => {
  const classes = UseStyle();
  const [value, setValue] = useState(1);
  const [isWhitelisted, setWhitelisted] = useState(false);
  const [salePrice, setSalePrice] = useState(0);
  const [presalePrice, setPresalePrice] = useState(0);
  const [preSaleOpen, setPresaleOpen] = useState(true);
  const { account, library } = useWeb3React();

  const getSalePriceValue = () => {
    const price = value * salePrice;
    return price.toString();
  };
  const getPreSalePriceValue = () => {
    const price = value * presalePrice;
    return price.toString();
  };
  const handleMint = async () => {
    if (account && library) {
      try {
        const signer = await library.getSigner();
        if (isWhitelisted && preSaleOpen) {
          const contract = new Contract(NFTContract, abi, signer);
          let overRides = {
            value: parseUnits(getPreSalePriceValue(), "ether"),
          };
          const txResult = await contract.presaleMint(value, overRides);
          await txResult.wait();
          alert(`${value} ThisNFTisCrap NFT's minted successfully!`);
        } else {
          const contract = new Contract(NFTContract, abi, signer);
          let overRides = {
            value: parseUnits(getSalePriceValue(), "ether"),
          };
          const txResult = await contract.mint(value, overRides);
          await txResult.wait();
          alert(`${value} ThisNFTisCrap NFT's minted successfully!`);
        }
      } catch (err: any) {
        if (err.data) {
          if (err.code === -32000) {
            alert("Insufficient Funds");
          } else {
            alert(err.message);
            console.log(err.code);
          }
        } else {
          if (err.code === 4001) {
            alert("User denied transaction signature.");
          } else alert(err.error.message);
        }
      }
    }
  };
  useEffect(() => {
    const getMints = async () => {
      console.log(library);
      const signer = await library?.getSigner();
      const contract = new Contract(NFTContract, abi, signer);
      const wls = await contract.addressInWhitelist(account);
      const pp = await contract.presalePrice(1);
      const sp = await contract.salePrice(1);
      const isPreOpen = await contract.isPresaleOpen();
      setSalePrice(Number(formatUnits(sp, "ether")));
      setPresalePrice(Number(formatUnits(pp, "ether")));
      setWhitelisted(wls);
      setPresaleOpen(isPreOpen);
    };
    if (account && library) {
      getMints();
    }
  }, [account, library]);
  const increment = () => {
    if(preSaleOpen){
      if (value < 2) {
        setValue((value) => value + 1);
      }
    }else{
      if (value < 5) {
        setValue((value) => value + 1);
      }
    }
  };

  const decrement = () => {
    if (value > 1) {
      setValue((value) => value - 1);
    }
  };
  return (
    <>
      <div className={classes.title1}>
        <span>
          <b>Your Address : </b>
          {account}{" "}
          {isWhitelisted && <Chip color="success" label={isWhitelisted ? "Whitelisted" : ""} />}
        </span>
      </div>
      <div className={classes.title}>Click buy to mint your NFT.</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: " 12px",
        }}
      >
        <div onClick={decrement}>
          <IconButton>
            <RemoveCircleOutlinedIcon />
          </IconButton>
        </div>
        <div style={{ fontSize: "22px", width: "60px", textAlign: "center" }}>
          {value}
        </div>
        <div onClick={increment}>
          <IconButton>
            <AddCircleOutlinedIcon />
          </IconButton>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          paddingTop: "24px",
          paddingBottom: "16px",
        }}
      >
        <Button
          onClick={() => handleMint()}
          color="primary"
          sx={{
            fontSize: "12px",
            height: "36px",
            backgroundColor: "#000",
            borderRadius: "18px",
          }}
          variant="contained"
        >
          {" "}
          Mint NFT
        </Button>
      </div>
    </>
  );
};

const UseStyle = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      paddingTop: "24px",
      fontWeight: "400",
      fontSize: "16px",
      textAlign: "center",
    },
    title1: {
      paddingTop: "24px",
      fontWeight: "400",
      fontSize: "16px",
      textAlign: "center",
    },
  })
);
