import React, {useState}from 'react'
import {Container, Row, Col, Button, Modal } from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux"
import TextField from '@material-ui/core/TextField';
import { addProduct_action } from '../../../actions/product.action';


const Products = (props) => {

	const dispatch = useDispatch();
    // const category = useSelector((state)=>
    //     state.category_root_reducer.categories
    // )

  const [show, setShow] = useState(false);
  

  const handleClose = () => {
	const form = new FormData();
	form.append('name', name);
	form.append('quantity', quantity);
	form.append('price',price);
	form.append('description',description);
	form.append('category',categoryId);

	for(let pic of productPictures)
	{
		form.append('productPictures',pic);
	}
	

	dispatch(addProduct_action(form))


	setShow(false)

};
  const handleShow = () => setShow(true);

  const [name, setname] = useState('');
  const [quantity, setquantity] = useState('');
  const [price, setprice] = useState('');
  const [description, setdescription] = useState('')
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setproductPictures] = useState([]);

  const category = useSelector((state)=>
        state.category_root_reducer.categories
    )

  const createCategoryList = (categories, options =[]) => {
	for(let category of categories)
	{
		options.push({value: category._id, name: category.name})
		if(category.children.length > 0)
		{
		  createCategoryList(category.children, options)
		}
	}
	return options
}

const handleProductPictures = (e) => {
	setproductPictures([
		...productPictures,
		e.target.files[0]
	])
}

  	return(
		<Container>
			<Row>
				<Button variant="primary" onClick={handleShow}>
					ADD
				</Button>
			</Row> 
			
				
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Add Product</Modal.Title>
					</Modal.Header>
					<Modal.Body >
					<TextField
						label="Product Name"
						variant="outlined"
						value={name}
						onChange = {(e)=>setname(e.target.value)}
						fullWidth 
						style={{marginBottom:10}}
					/>
					<br></br>
					<TextField
						label="Product quantity"
						variant="outlined"
						value={quantity}
						onChange = {(e)=>setquantity(e.target.value)}
						fullWidth 
						style={{marginBottom:10}}
					/>
					<TextField
						label="Product price"
						variant="outlined"
						value={price}
						onChange = {(e)=>setprice(e.target.value)}
						fullWidth 
						style={{marginBottom:10}}
					/>
					<TextField
						label="Product description"
						variant="outlined"
						value={description}
						onChange = {(e)=>setdescription(e.target.value)}
						fullWidth 
						style={{marginBottom:10}}
					/>
					<select className='form-control' value={categoryId} onChange={(e)=>setCategoryId(e.target.value)} style={{marginBottom:'15px'}}>
						<option>Select Category</option>
						{
							createCategoryList(category).map((option)=>
								<option key ={option.value} value={option.value}>{option.name}</option>
							)
						}
					</select>
					{
						productPictures.length > 0 ? productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
					}
					<input type='file' name='productPictures' onChange={setproductPictures} onChange={handleProductPictures}/>

					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" onClick={handleClose}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
			
		</Container>
   	)
  }


export default Products