import { Grid, Container, Typography, Button, Modal} from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { addCategory_action, get_category_action } from '../../../actions/category.action';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


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
      const [open, setOpen] = useState(false);
      const [categoryName, setCategoryName] = useState('')
      const [parentCategoryId, setparentCategoryId] = useState('')
      const [CategoryImage, setCategoryImage] = useState('')

      const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {

        const form = new FormData();
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage',CategoryImage);
        dispatch(addCategory_action(form))
        setOpen(false);

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

     
      const body = (
        <div className={classes.paper}>
          <h2 id="simple-modal-title">Add new Category</h2>
          <TextField
            label="Category Name"
            variant="outlined"
            value={categoryName}
            onChange = {(e)=>setCategoryName(e.target.value)}
            style={{marginBottom:10}}
            fullWidth
            />

            <select className='form-control' value={parentCategoryId} onChange={(e)=>setparentCategoryId(e.target.value)}  style={{marginBottom:'15px'}}>
                <option>Select Category</option>
                {
                    createCategoryList(category).map((option)=>
                        <option key ={option.value} value={option.value}>{option.name}</option>
                    )
                }
            </select>
            <input type='file' name='categoryImage' onChange={handlecategoryImage}/>

            <br></br>
          <button type="button" onClick={handleClose}>
                Close Modal
            </button>
            
        </div>
      );

      
    useEffect (() => {
        dispatch(get_category_action())
    }, [])

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
                    <Button variant="contained" color="secondary" onClick={handleOpen}>
                        Add
                    </Button>
                </Grid>

            </Grid>
            <Grid >
                <ul>
                    {renderCategories(category)}
                    
                </ul>
            </Grid>
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >   
                
                {body}
            </Modal>

        
        </Container>

        
   )

 }

export default Categories