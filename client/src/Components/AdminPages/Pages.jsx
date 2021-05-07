import { Button, TextField,  } from '@material-ui/core'
import React, { useState, useEffect } from 'react'

import { Container, Row, Col, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
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
    const[categoryId, seCategoryId] = useState('')

    const[Description, setDescription] = useState('')
    const[Banner, setBanner] = useState([])
    const[Products, setProducts] = useState([])

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
        console.log(e);
    }
    const handleProductImage = (e) =>{
        console.log(e);
    }

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
                                    onChange={(e)=> seCategoryId(e.target.value)}
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

                        <input type="file" name="banners" onChange={handleBannerImage()}/>
                        
                        <input type="file" name="products" onChange={handleProductImage()}/>
                

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="contained" color="primary" onClick={handleclose}>
                            Close
                        </Button>&nbsp;
                        <Button variant="contained" color="secondary" >
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