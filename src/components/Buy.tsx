import { Chip, Theme} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useState } from 'react';

export const Buy = () => {
    const classes = UseStyle();
    const [value, setValue] = useState(0);

    const increment = () => {
        console.log("clicked")
        setValue(value => value+1);
    }

    const decrement = () => {
        if (value > 0) {
            setValue(value => value-1);
        }
    }
    return (
        <>
            <div className={classes.title}>
                Click buy to mint your NFT.
            </div>
            <div style={{display: 'flex', justifyContent: 'center', paddingTop:' 12px'}}>
                <div onClick={decrement}>
                    <RemoveCircleOutlinedIcon />
                </div>
                <div style={{fontSize: '22px', width: '60px', textAlign:'center'}}>
                    {value}
                </div>
                <div onClick={increment}>
                    <AddCircleOutlinedIcon />
                </div>
            </div>
            <div style={{textAlign:'center', paddingTop: '24px', paddingBottom: '16px'}}>
                <Chip
                    onClick={() => console.log("clicked")}
                    label="BUY"
                    color="primary"
                    sx={{
                        fontSize: '12px',
                        height: '36px',
                        backgroundColor: '#000',
                        borderRadius: '18px'
                    }}/>
            </div>
        </>
    )
}

const UseStyle = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            paddingTop: '24px',
            fontWeight: '400',
            fontSize: '16px',
            textAlign: 'center'
        },
    })
)