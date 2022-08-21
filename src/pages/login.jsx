import React from "react";
import {
	FormControl,
	InputGroup,
	Button,
	Modal
} from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, errLoginFalse } from '../redux/actions'

class LoginPage extends React.Component {
	// Membuat tampilan 'password'
	constructor(props) {
		super(props)
		this.state = {
			visibility: false,
			error: false,
		}
	}

	// function untuk login {di tempelkan pada buttom login}
	onLogin = () => {
		// ambil data dari input password dan username
		let username = this.refs.username.value
		let password = this.refs.password.value
		// console.log(username, password)

		// kalau ada input yang masih kosong, natofi data tidak boleh kosong
		if (!username || !password) {
			return this.setState({ error: true })
		}

		// cek apakah data yang dikirim oleh user sudah ada di daftar users di database
		this.props.login(username, password)
	}

	render() {
		// kalau ada langsung menuju halaman utama atau (landing page)
		if (this.props.username) {
			return <Navigate to="/" />
		}

		console.log(this.props.username)
		const { visibility } = this.state
		return (
			<div style={styles.cont} >
				<div style={styles.contForm} >
					<h1>Hello,</h1>
					<h3 className="mb-4">Welcome Back!</h3>
					<label>Username</label>
					<InputGroup className="mb-3">
						<InputGroup.Text id="basic-addon1">
							<i className="fad fa-user"></i>
						</InputGroup.Text>
						<FormControl
							placeholder="Input Here"
							ref="username"
						/>

					</InputGroup>
					<label>Password</label>
					<InputGroup className="mb-3">
						<InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility: !visibility })}>
							{visibility ? <i className="far fa-eye"></i> : <i className="far fa-eye-slash"></i>}
						</InputGroup.Text>
						<FormControl
							placeholder="Input Here"
							type={visibility ? "text" : "password"}
							ref="password"
						/>
					</InputGroup>
					<div style={styles.contButton}>
						<Button onClick={this.onLogin} variant="primary" style={styles.button}>Login</Button>
					</div>
					<p style={styles.goToRegis}>Do You Have an Acount? <Link style={{ color: 'navy', fontWeight: 'bold' }} to="/register" >Register</Link></p>
				</div>
				<Modal show={this.state.error}>
					<Modal.Header>
						<Modal.Title>Error</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<p>Please input all of data!!</p>
					</Modal.Body>

					<Modal.Footer>
						<Button onClick={() => this.setState({ error: false })} variant="secondary">OK</Button>
					</Modal.Footer>
				</Modal>
				<Modal show={this.props.errorLogin}>
					<Modal.Header>
						<Modal.Title>Error</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<p>This account is doesn't exist!</p>
					</Modal.Body>

					<Modal.Footer>
						<Button onClick={this.props.errLoginFalse} variant="secondary">OK</Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
}

const styles = {
	cont: {
		backgroundImage: 'url(https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=799&q=80)',
		backgroundSize: 'cover',
		height: '100vh',
		display: 'flex',
		justifyContent: 'center'

	},
	contForm: {
		width: '30vw',
		height: '65vh',
		marginTop: '20vh',
		borderRadius: '10px',
		backgroundColor: 'rgba(255, 255, 255, 0.7',
		padding: '2%'

	},
	contButton: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '10px',
		padding: '1%'
	},

	button: {
		backgroundColor: '#00675b',
		border: 'none',
		color: 'white',
		margin: 'auto'
	},

	goToRegis: {
		fontWeight: 'bold',
		textAlign: 'center'
	}
}

const mapStateToProps = (state) => {
	return {
		errorLogin: state.userReducer.errorLogin,
		username: state.userReducer.username
	}
}

export default connect(mapStateToProps, { login, errLoginFalse })(LoginPage)