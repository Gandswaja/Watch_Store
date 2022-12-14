import React from 'react'
import Axios from 'axios'
import NavigationBar from '../component/navigationBar'
import {
	Carousel,
	Button,
	FormControl
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { addCart } from '../redux/actions'
const api = 'https://watch-database17.herokuapp.com'

class DetailPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			product: {},
			qty: 1,
			toLogin: false,
			toCart: false
		}
	}

	componentDidMount() {
		Axios.get(`${api}/products/${document.location.search.substring(1)}`)
			.then(res => {
				this.setState({ product: res.data })
			})
	}

	onChangeQty = (e) => {
		let value = +e.target.value
		let maxQty = this.state.product.stock

		if (value < 1) {
			this.setState({ qty: 1 })
		} else if (value > maxQty) {
			this.setState({ qty: maxQty })
		} else {
			this.setState({ qty: value })
		}
	}

	onMinus = () => {
		this.setState({ qty: this.state.qty - 1 })
	}

	onPlus = () => {
		this.setState({ qty: this.state.qty + 1 })
		if (this.props.role !== 'user') {
			return alert('Silakan Login Dulu Bosque')
		}

	}

	onCheckout = () => {
		const { product, qty } = this.state
		if (!this.props.username) {
			return this.setState({ toLogin: true })
		}

		// siapkan data produk yang mau kita push ke dalam cart user yang sedang aktif
		let obj = {
			id: product.id,
			name: product.name,
			image: product.images[0],
			price: product.price,
			qty,
			stock: product.stock
		}
		// console.log(obj)

		this.props.addCart(this.props.id, obj)

		this.setState({ toCart: true })
	}


	render() {
		const { product, qty, toLogin, toCart } = this.state
		console.log(this.props.dataUser)
		if (toLogin) {
			return <Navigate to="/login" />
		} else if (toCart) {
			return <Navigate to="/cart" />
		}
		return (
			<div style={{ backgroundColor: '#A3DDCB', height: '110vh', paddingTop: '10vh' }}>
				<NavigationBar />
				<div style={styles.contTitle}>
					<h1>Detail Page</h1>
					{this.props.role === 'user'
						?
						<Button variant="outline-dark" onClick={this.onCheckout}>Add to Cart</Button>
						:
						null
					}

				</div>
				<div style={{ display: 'flex', marginLeft: '1%', marginRight: '1%' }}>
					<div style={styles.contImg}>
						<Carousel style={{ height: '75vh' }}>
							{(product.images ? product.images : []).map((item, index) => {
								return (
									<Carousel.Item key={index}>
										<img
											className="d-block"
											style={styles.img}
											src={item}
											alt="First slide"
										/>
									</Carousel.Item>
								)
							})}
						</Carousel>
					</div>
					<div style={styles.contDesc}>
						<h1 style={{ border: '5px solid white', borderRadius: '10px', padding: '1%' }}>{product.name ? product.name : ""}</h1>
						<p><strong>Category:</strong> {product.category ? product.category : ""}</p>
						<p><strong>Brand:</strong> {product.brand ? product.brand : ""}</p>
						<p><strong>Color:</strong> {product.colour ? product.colour : ""}</p>
						<p><strong>Description:</strong> {product.description ? product.description : ""}</p>
						<p><strong>Price:</strong> IDR {product.price ? product.price.toLocaleString() + ",00" : ""}</p>
						<p><strong>Stock:</strong> {product.stock ? product.stock : ""}</p>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<p style={{ marginBottom: '0' }}><strong>Quantity:</strong></p>
							<div style={{ display: 'flex', width: '30%', justifyContent: 'space-around' }}>
								<Button disabled={qty <= 1 ? true : false} variant="outline-danger" onClick={this.onMinus}>
									<i className="fas fa-minus"></i>
								</Button>
								<FormControl
									style={{ width: '50%' }}
									value={qty}
									onChange={(e) => this.onChangeQty(e)}
								/>
								<Button disabled={qty === product.stock ? true : false} variant="outline-success" onClick={this.onPlus}>
									<i className="fas fa-plus"></i>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const styles = {
	contTitle: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '1%',
		height: '10vh',
		marginTop: '10px'
	},
	contImg: {
		backgroundColor: '#03506F',
		flexBasis: '40%',
		borderRadius: '10px'
	},
	contDesc: {
		flexBasis: '60%',
		padding: '0 1% 0 1%',
	},
	img: {
		height: '50vh',
		width: '20vw',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: '10%'
	},
}

const mapStateToProps = (state) => {
	return {
		username: state.userReducer.username,
		id: state.userReducer.id,
		dataUser: state.userReducer,
		role: state.userReducer.role
	}
}
export default connect(mapStateToProps, { addCart })(DetailPage)