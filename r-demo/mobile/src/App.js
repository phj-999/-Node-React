import {Container} from 'react-bootstrap';
import { BrowserRouter as Router,Route } from "react-router-dom";
import Footer from './components';
import Header from './components';
import HomeScreen from './screeens/HomeScreen';
import ProductScreen from './screeens/ProductScreen';
import CartScreen from './screeens/cartScreen';
import LoginScreen from './screeens/LoginScreen';
import RegisterScreen from './screeens/RegisterScreen';
import ProfileScreen from './screeens/ProfileScreen';
import PaymentScreen from './screeens/PaymentScreen';
import ShippingScreen from './screeens/ShippingScreen';
import PlaceorderScreen from './screeens/PlaceorderScreen';
import OrderScreen from './screeens/OrderScreen';

function App() {
  return (
    <Router>
      <Header>
        <main className='py-3'>
          <Container>
           
            <Route path='/' component={HomeScreen} exact/>
            <Route path='/register' component={RegisterScreen}/>
            <Route path='/placeorder' component={PlaceorderScreen}/>
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/orders/:id' component={OrderScreen}/>
            <Route path='/shipping' component={ShippingScreen}/>
            <Route path='/login' component={LoginScreen}/>
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/product/:id' component={ProductScreen} exact/>
            <Route path='/cart/:id?' component={CartScreen}/>
          </Container>
        </main>
      </Header>

      <Footer></Footer>
    </Router>
  );
}

export default App;
