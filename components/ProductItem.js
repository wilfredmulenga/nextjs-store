import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Button } from '@material-ui/core'
import Link from 'next/link'
import { convertPrice } from '../helpers'

const useStyles = makeStyles(() => ({
  root: { 
    width: '100%', 
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'space-around', 
    marginBottom: '100px',

  },
  imageWrapper: {
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'fill',
      backgroundColor: '#FFFFFF',
      borderRadius: '5px',
      padding: '10px',
      boxShadow: '0px 18.025px 43.775px rgba(0, 0, 0, 0.25)',
      cursor: 'pointer'
    }
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 0,
    marginBottom: '1rem',
    fontSize: '1.75rem',
    fontWeight: 'bold'
  },
  price: {
    marginTop: 0,
    marginBottom: 0,
    marginRight: '2rem',
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  description: {
    fontSize: '0.9rem'
  },
  buttonWrapper: {
    display: 'flex',
    paddingBottom: '10px'
  }
}))

const ProductItem = ({ productDetails, currencyRates, baseCurrency }) => {
  const classes = useStyles()
  const { image: imageUrl, description, price, title, id } = productDetails
  return(
      <Grid container spacing={2} direction={ id %2 === 1 ? 'row' : 'row-reverse' } className={classes.root}>
    <Grid item sm={5} className={classes.imageWrapper}>
<Link href={`/product/${id}`} >
  <Image src={imageUrl} alt={title} width='400' height='300' priority />
</Link>
    </Grid>
 <Grid item sm={5} className={classes.textWrapper}>
<div>
<p className={classes.title}>{title}</p>
 <p className={classes.description}>{description}</p>
</div>
<div className={classes.buttonWrapper}>
<p className={classes.price}>{convertPrice({price, currencyRates, baseCurrency})}</p>
{/* <Button variant="contained" color="primary">
        View more
      </Button> */}
</div>
 </Grid>
</Grid>
  )
}

export default ProductItem