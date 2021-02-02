import {connect} from 'react-redux';
import {wrapper} from '../components/store';
import Navbar from '../components/Navbar'
import ContactUs from '../components/ContactUs'
import Footer from '../components/Footer'
import ProductItem from '../components/ProductItem'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core';
import { METALLIC_SUNBURST } from '../src/colors';


const useStyles = makeStyles(() => ({
  root: { 
    width: '100%', 
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    marginBottom: '80px',
  },
  title: {
    fontSize: '80px',
    color: METALLIC_SUNBURST,
    margin: '10px'
  }
 }))
const Home = ({ posts, currencyRates, baseCurrency }) => {

  const classes = useStyles()
  return <div className={classes.root}>
    <Navbar/>
   <div className={classes.titleWrapper}>
   <Typography variant="h5">Unleash</Typography>
    <p className={classes.title}>Extravagent</p>
    <p>Find your inner self</p>
   </div>
  <div>
  {
    posts && posts.map((product) => {
      return (
        <ProductItem productDetails={product} currencyRates={currencyRates} baseCurrency={baseCurrency} />
      )
    })
  }
  </div>
  <ContactUs />
  <Footer />
</div>
}

export const getStaticProps = wrapper.getServerSideProps(
    async ({ store }) => {
 try {
  const res = await fetch('https://fakestoreapi.com/products?limit=10')
  const posts = await res.json()
  const fetchCurrencyRates = await fetch('https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,GBP,JPY')
  const currencyRates  = await fetchCurrencyRates.json()
  store.dispatch({type: 'FETCH_POSTS', payload: posts });
  store.dispatch({ type: 'FETCH_CURRENCY_RATES', payload: currencyRates.rates })
 } catch (error) {
   console.log(error)
 }
    }
);

export default connect(state => state)(Home)
