import { Grid, Typography, Button} from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { addCategory_action, get_category_action } from '../../../actions/category.action';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Container, Row, Col, Modal } from 'react-bootstrap'


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

      const handleOpen = () => {
        
        setShow(true)
      };
    
      const handleClose = () => {

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
              options.push({value: category._id, name: category.name})
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
            <li key = {categ._id}>
                {categ.name}
                <ul>
                    {categ.children.length > 0 ?
                        (
                            renderCategories(categ.children)
                        )
                    :
                    null

                    }
                </ul>

            </li>)
           
        }
        return ALL_categories;
    }
  


  return(
        <Container component="main" >
            <pre>{JSON.stringify(category)}</pre>
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
                <ul>
                    {renderCategories(category)}
                    
                </ul>
            </Grid>
            
            <Modal show={show} onHide={handleClose}>
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
						<Button color="primary" onClick={handleClose}>
							Close
						</Button>
						<Button color="secondary" onClick={handleClose}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>

        
        </Container>

        
   )

 }

export default Categories