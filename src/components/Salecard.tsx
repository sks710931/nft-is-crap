import { Theme} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Buy } from './Buy';
// import { Connect } from './Connect';

export const Salecard = () => {
    const classes = UseStyle();
    return (
        <div className={classes.main}>
            <div className={classes.title}>
                0 / 50000
            </div>
            <div className={classes.address}>
                0xach36433393....
            </div>
            <div className={classes.cost}>
                1 soccer ball costs 25 MATIC.
            </div>
            <div className={classes.address}>
                Excluding gas fees.
            </div>
            {/* <Connect /> */}
            <Buy />
        </div>
    )
}

const UseStyle = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            minHeight: '360px',
            border: '2px solid black',
            boxShadow: 'rgba(0, 0, 0, 0.75) 0px 5px 15px;'
        },
        title: {
            paddingTop: '32px',
            fontWeight: '600',
            fontSize: '48px',
            textAlign: 'center'
        },
        address: {
            paddingTop: '24px',
            fontWeight: '400',
            fontSize: '16px',
            textAlign: 'center'
        },
        cost: {
            paddingTop: '24px',
            fontWeight: '600',
            fontSize: '18px',
            textAlign: 'center'
        }
    })
)