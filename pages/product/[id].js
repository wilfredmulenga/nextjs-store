import { useRouter } from 'next/router'
import {connect} from 'react-redux';
import Image from 'next/image'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Navbar from '../../components/Navbar'
import { convertPrice } from '../../helpers'

const useStyles = makeStyles(() => ({
  root: { 
    width: '100%', 
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  imageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    '& img': {
      width: '400px',
      height: '300px',
      objectFit: 'fill',
      backgroundColor: '#FFFFFF',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '20px',
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
  },
  main: {
    display: 'flex',
    justifyContent: 'space-around'
  }
}))
const Product = ({ posts, currencyRates, baseCurrency }) => {
  const router = useRouter()
  const classes = useStyles()
  const { id: productId } = router.query

  const selectedProduct =  posts && posts.find(product => product.id === Number(productId))

  if(!selectedProduct) return(
    <div>
      <Navbar/>
      <p>Product not found.</p>
    </div>
  )

  const { title, price, description, image: imageUrl } = selectedProduct
  return(
    <div className={classes.root}>
      <Navbar />
      <Grid container justify='center' className={classes.main}>
     <Grid className={classes.imageWrapper} sm={12}>
     <Image src={imageUrl} alt={title} width='400' height='300'/>
     </Grid>
     <Grid sm={5}>
<p className={classes.title}>{title}</p>
 <p className={classes.description}>{description}</p>
<p className={classes.price}>{convertPrice({price, currencyRates, baseCurrency})}</p>
      </Grid>
      </Grid>
      </div>
  )
}

export default connect(state => state)(Product)