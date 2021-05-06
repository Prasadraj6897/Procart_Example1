import { Grid, Typography, Button} from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { addCategory_action, get_category_action, UpdateCategory_action } from '../../../actions/category.action';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Container, Row, Col, Modal } from 'react-bootstrap'

//added new library
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
// import '../../../../node_modules/react-checkbox-tree/lib/index'


const Categories = () => {

   
    const dispatch = useDispatch();
    const category = useSelector((state)=>
        state.category_root_reducer.categories
    )
    const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));
      const classes = useStyles();
      const [show, setShow] = useState(false);
      const [categoryName, setCategoryName] = useState('')
      const [parentCategoryId, setparentCategoryId] = useState('')
      const [CategoryImage, setCategoryImage] = useState('')

      const [checked, setChecked] = useState([])
      const [expanded, setExpanded] = useState([])

      const [checkedArray, setCheckedArray] = useState([])
      const [expandedArray, setExpandedArray] = useState([])

       

      const [updateCategoryModal, setupdateCategoryModal] = useState(false)


      const handleOpen = () => {
        
        setShow(true)
      };

      const handleCloseModal = () => {
        
        setShow(false)
      };

      const handleCloseUpdateModal = () => {
        setupdateCategoryModal(false)
      }
    
      const handleSave = () => {

        const form = new FormData();
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage',CategoryImage);
        dispatch(addCategory_action(form))
        setShow(false)

        setCategoryName('');
        setparentCategoryId('');


      };

      const createCategoryList = (categories, options =[]) => {
          for(let category of categories)
          {
              options.push({value: category._id, name: category.name, parentId: category.parentId})
              if(category.children.length > 0)
              {
                createCategoryList(category.children, options)
              }
          }
          return options
      }

      const handlecategoryImage = (e) =>{
        setCategoryImage(e.target.files[0])
      }

   
      
     const renderCategories = (category) => {
        let ALL_categories = []
        for(let categ of category)
        {
            ALL_categories.push( 
                {
                    label: categ.name,
                    value: categ._id,
                    children: (categ.children.length > 0) && (renderCategories(categ.children))
                }
            )
           
        }
        return ALL_categories;
    }

    const handleupdateCategoryModal = () => {
       const categories =  createCategoryList(category)
       const checkArray = [];
       const expandArray = [];  
       checked.length > 0 && checked.forEach((categoryId, index) => {
           const category = categories.find((category, _index) => categoryId == category.value)
           category && checkArray.push(category)
       })
       setCheckedArray(checkArray)

       expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && expandArray.push(category)
        })
        setExpandedArray(expandArray)

        setupdateCategoryModal(true)
        console.log({checkArray, expandArray})
    }
  
    const handleUpdateSave = () =>{

        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('_id',item.value);
            form.append('type', item.type);
        })

        checkedArray.forEach((item, index) => {
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('_id',item.value);
            form.append('type', item.type);
        })

        dispatch(UpdateCategory_action(form))
        .then( result =>
            {
                if(result)
                {
                    dispatch(get_category_action())
                }
            })
        setupdateCategoryModal(false)
    }
    
    const handleCategoryInput = (key, value, index, type) => {
        if(type=='checked')
        {
            const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? {...item, [key]: value } : item)
            setCheckedArray(updatedCheckedArray)
        }
        else if(type='expanded')
        {
            const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? {...item, [key]: value}  : item)
            setExpandedArray(updatedExpandedArray)
        }
    }


  return(
        <Container component="main" >
            {/* <pre>{JSON.stringify(category)}</pre> */}
            <Grid >
                <Typography variant ="h5">
                    Categories
                </Typography>
                <Grid container justify="flex-end">
                    <Button variant="contained" color="primary" onClick={handleOpen}>
                        Add
                    </Button>
                </Grid>

            </Grid>
            <Grid >
                {/* <ul>
                    {renderCategories(category)}
                    
                </ul> */}
                <CheckboxTree
                    nodes={renderCategories(category)}
                    checked={checked}
                    expanded={expanded}
                    onCheck={checked => setChecked( checked )}
                    onExpand={expanded => setExpanded( expanded )}
                />
            </Grid>

            <Row>
                <Col>
                    <Button color="primary" variant="contained" onClick={handleupdateCategoryModal}> Update </Button>&nbsp;
                    <Button variant="contained" color="secondary" > Delete </Button>
                </Col>
            </Row>
            
                <Modal show={show} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                        <TextField
                            label="Category Name"
                            variant="outlined"
                            value={categoryName}
                            onChange = {(e)=>setCategoryName(e.target.value)}
                            style={{marginBottom:10}}
                            fullWidth
                        />
                        <br></br>
                        <select className='form-control' value={parentCategoryId} onChange={(e)=>setparentCategoryId(e.target.value)}  style={{marginBottom:'15px'}}>
                            <option>Select Category</option>
                            {
                                createCategoryList(category).map((option)=>
                                    <option key ={option.value} value={option.value}>{option.name}</option>
                                )
                            }
                        </select>
                        <input type='file' name='categoryImage' onChange={handlecategoryImage}/>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="contained" color="primary" onClick={handleCloseModal}>
                                Close
                            </Button>&nbsp;
                            <Button variant="contained" color="secondary" onClick={handleSave}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                </Modal>
            

            {/* Edit Categories */}
            <Grid>
                <Modal show={updateCategoryModal} size="lg" onHide={handleCloseUpdateModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Categories</Modal.Title>
                        </Modal.Header>
                        
                        <Row>
                            <Col>
                                <h6>Expanded</h6>
                            </Col>
                            {/*  const checkArray = [];
                                const expandArray = []; */}
                        </Row>
                        
                            {
                                expandedArray.length > 0 && 
                                expandedArray.map((item, index) =>
                                
                                <Row key = {index} >
                                    <Col>
                                        <TextField
                                            label="Category Name"
                                            variant="outlined"
                                            value={item.name}
                                            onChange = {(e)=>handleCategoryInput('name', e.target.value, index, 'expanded')}
                                            style={{marginBottom:10}}
                                            fullWidth
                                        />
                                    </Col>
                                    <Col>
                                        <select className='form-control' value={item.parentId} onChange={(e)=>handleCategoryInput('parentId', e.target.value, index, 'expanded')}  style={{marginBottom:'15px'}}>
                                            <option>Select Category</option>
                                            {
                                                createCategoryList(category).map((option)=>
                                                    <option key ={option.value} value={option.value}>{option.name}</option>
                                                )
                                            }
                                        </select>
                                    </Col>

                                    <Col>
                                        <select className='form-control'>
                                            <option value="">Select Type</option>
                                            <option value="store">Store</option>
                                            <option value="product">Product</option>
                                            <option value="page">page</option>
                                        </select>
                                    </Col>
                                </Row>

                                
                                )
                            }
                        
                        {/* Checked */}

                        <Row>
                            <Col>
                                <h6>Checked</h6>
                            </Col>
                            {/*  const checkArray = [];
                                const expandArray = []; */}
                        </Row>
                        
                            {
                                checkedArray.length > 0 && 
                                checkedArray.map((item, index) =>
                                
                                <Row key = {index} >
                                    <Col>
                                        <TextField
                                            label="Category Name"
                                            variant="outlined"
                                            value={item.name}
                                            onChange = {(e)=>handleCategoryInput('name', e.target.value, index, 'checked')}
                                            style={{marginBottom:10}}
                                            fullWidth
                                        />
                                    </Col>
                                    <Col>
                                        <select className='form-control' value={item.parentId} onChange={(e)=>handleCategoryInput('parentId', e.target.value, index, 'checked')}  style={{marginBottom:'15px'}}>
                                            <option>Select Category</option>
                                            {
                                                createCategoryList(category).map((option)=>
                                                    <option key ={option.value} value={option.value}>{option.name}</option>
                                                )
                                            }
                                        </select>
                                    </Col>

                                    <Col>
                                        <select className='form-control'>
                                            <option value="">Select Type</option>
                                            <option value="store">Store</option>
                                            <option value="product">Product</option>
                                            <option value="page">page</option>
                                        </select>
                                    </Col>
                                </Row>

                                
                                )
                            }

                        
                        <Modal.Body >
                            
                            {/* <input type='file' name='categoryImage' onChange={handlecategoryImage}/> */}
                        </Modal.Body>
                        
                        <Modal.Footer>
                            <Button variant="contained" color="primary" onClick={handleCloseUpdateModal}>
                                Close
                            </Button> &nbsp;
                            <Button variant="contained" color="secondary" onClick={handleUpdateSave}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                </Modal>
                </Grid>
                    {/* Finished */}
        </Container>

        
   )

 }

export default Categories