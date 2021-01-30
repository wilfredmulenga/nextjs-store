import { useRouter } from 'next/router'
import {connect} from 'react-redux';
import Navbar from '../../components/Navbar'
import { convertPrice } from '../../helpers'


const Product = ({ posts, currencyRates, baseCurrency }) => {
  const router = useRouter()
  const { id } = router.query

  const selectedProduct =  posts && posts.find(product => product.id === Number(id))

  if(!selectedProduct) return(
    <div>
      <Navbar/>
      <p>Product not found.</p>
    </div>
  )
      const { image: imageUrl, description, price, title, category} = selectedProduct
  return(
    <div>
      <Navbar />
      <div style={{ width: '400px' }} >
      <p>{title}</p>
      <p>{convertPrice({price, currencyRates, baseCurrency})}</p>
      <img src={imageUrl} alt={title} style={{ width: '400px', height: '300px' }}/>
    </div>
    </div>
  )
}

export default connect(state => state)(Product)