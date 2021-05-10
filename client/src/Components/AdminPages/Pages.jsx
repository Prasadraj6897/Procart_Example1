import { Button, TextField,  } from '@material-ui/core'
import React, { useState, useEffect } from 'react'

import { Container, Row, Col, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { create_page_action } from '../../actions/page.action'
import LinearcreateCategoryList from '../helpers/LinearCreateCategory'
/**
* @author
* @function NewPage
**/

const NewPage = (props) => {

    const [createModal, setCreateModal] = useState(false)
    const [title, setTitle] = useState('')
    const category = useSelector(state => state.category_root_reducer.categories)
    const [categories, setCategories] = useState([])
    const[categoryId, setCategoryId] = useState('')

    const[Description, setDescription] = useState('')
    const[type, setType] = useState('')
    const[Banner, setBanner] = useState([])
    const[Products, setProducts] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        setCategories(LinearcreateCategoryList(category))
    }, [category])
    
    const handleclose = () =>{
        setCreateModal(false)
    }

    const handleCreatePageModal = () => {
        setCreateModal(true);
    }

    const handleBannerImage = (e) =>{
        setBanner([...Banner, e.target.files[0]]);
    }
    const handleProductImage = (e) =>{
        setProducts([...Products, e.target.files[0]]);
    }
    const onCategoryChange = (e) => {
        // console.log(e.target)
        const category = categories.find(category => category._id == e.target.value)
        setCategoryId(e.target.value)
        setType(category.type)
    }

    const handleCreatePage = (e) => {
        // e.target.preventDefault();
        const form = new FormData();
        form.append('title', title);
        form.append('description', Description);
        form.append('category', categoryId);
        form.append('type', type);

        Banner.forEach((banner, index) => {
            form.append('banners', banner);
        })

        Products.forEach((product, index) => {
            form.append('products', product);
        })
        
        dispatch(create_page_action(form))

        setCreateModal(false);
    }
    
    // 

    const renderCreatePageModal = () => {
        return(
               <Modal show={createModal} onHide={handleclose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Page</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >

                        <Row>
                            <Col>
                                <select
                                    className = 'form-control'
                                    value={categoryId}
                                    onChange={onCategoryChange}
                                    style={{margin:"10px 10px"}}
                                >
                                    <option value="">Select Category</option>
                                    {
                                        categories.map(cat =>
                                            <option key={cat._id} value={cat._id}>
                                                {cat.name}
                                            </option>
                                            )
                                    }
                                </select>
                            </Col>
                        </Row>


                        <TextField
                            label="Page Title"
                            variant="outlined"
                            value={title}
                            onChange = {(e)=>setTitle(e.target.value)}
                            style={{marginBottom:10}}
                            fullWidth
                        />

                        <TextField
                            label="Description"
                            variant="outlined"
                            value={Description}
                            onChange = {(e)=>setDescription(e.target.value)}
                            style={{marginBottom:10}}
                            fullWidth
                        />
                        <span>Banner</span><br></br>
                        {
                            Banner.length > 0 ? 
                            Banner.map((banner, index) => 
                                <Row>
                                    <Col key={index}>
                                        {banner.name}
                                    </Col>

                                </Row>
                            )

                            :
                            null

                        }
                        <input type="file" name="banners" onChange={handleBannerImage}/><br></br>
                        <span>Products</span><br></br>
                        {
                            Products.length > 0 ? 
                            Products.map((product, index) => 
                                <Row>
                                    <Col key={index}>
                                        {product.name}
                                    </Col>

                                </Row>
                            )

                            :
                            null

                        }
                        
                        <input type="file" name="products" onChange={handleProductImage}/>
                

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="contained" color="primary" onClick={handleclose}>
                            Close
                        </Button>&nbsp;
                        <Button variant="contained" color="secondary" onClick={handleCreatePage}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            
        )
    }

  return(
        <Container>
            {renderCreatePageModal()}
            <Button variant="contained" color="primary" onClick={handleCreatePageModal}>Create Page</Button>
        </Container>
   )
  }


export default NewPage