import { Chip, Theme} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const Connect = () => {
    const classes = UseStyle();
    return (
        <>
            <div className={classes.title}>
                Connect to the Polygon network.
            </div>
            <div style={{textAlign:'center', paddingTop: '24px'}}>
                <Chip
                    onClick={() => console.log("clicked")}
                    label="CONNECT"
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