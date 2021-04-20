import React, {useState} from 'react'

import Button from "@material-ui/core/Button/Button"
import Avatar from "@material-ui/core/Avatar/Avatar"
import Typography from "@material-ui/core/Typography/Typography"
import  Grid from "@material-ui/core/Grid/Grid"
import Paper from "@material-ui/core/Paper/Paper"
import Container from "@material-ui/core/Container/Container"
import  LockOutlined  from '@material-ui/icons/LockOutlined'
import useStyles from "./styles"
import Input from "./Input"

import {Formik, Form} from 'formik'
import * as Yup from "yup"



const initialState = {firstname:'', lastname:'', email:'', password:'', confirmpassword : ''}

let Admin = () => {

    
    const [formData, setformData] = useState(initialState)

    const classes = useStyles()
    const [isSignUp, setisSignUp] = useState(false)
    const [showPassword, setshowPassword] = useState(false)



    const handlesubmit = (e) => {
        e.preventDefault()
        
        if(isSignUp)
        {
            console.log("formData", formData)
        }
        else{
            console.log("formData", formData)
        }
    }

    const handlechange = (e) => {
      
        setformData({...formData,[e.target.name]:e.target.value})
        // console.log(formData)
    }

    const handleShowPassword = () => {
        setshowPassword((prevsetshowPassword)=> !prevsetshowPassword)
    }

    const switchmode = () => {

        setisSignUp((prevsetisSignUp)=> !prevsetisSignUp)
        setshowPassword(false)
        
    }

    const FORM_VALIDATION = Yup.object().shape({
        firstname: Yup.string()
            .required('Required'),
        
        lastname: Yup.string()
            .required('Required'),
    
        email: Yup.string()
            .email('Invalid Email')
            .required('Required'),
        
        password: Yup.string()
            .required('Required'),

    })

    return(
        <Container component="main" className={classes.container}>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography variant ="h5">
                    {
                        isSignUp ? 
                        
                        'Sign Up'
                        :
                        'Sign In'
                    }
                    
                </Typography>
                <Formik
                    initialValues={{
                        ...formData
                    }}

                    validationSchema = {FORM_VALIDATION}
                   
                >
                    <Form className={classes.form}  onSubmit = {handlesubmit}>
                        <Grid container spacing={2}>
                            {isSignUp &&
                                (
                                    <>
                                        
                                        <Input name="firstname" label="First Name" handlechange={handlechange} autoFocus half />
                                        <Input name="lastname" label="Last Name" handlechange={handlechange} half />
                                        
                                    </>
                                )    
                            }
                            <Input name="email" label="Email" handlechange={handlechange} type={"email"}/>
                            <Input name="password" label="Password" handlechange={handlechange} type={showPassword ? 'text' : "password"} handleShowPassword ={handleShowPassword}/>
                            
                            {isSignUp &&  <Input name="confirmpassword" label="Confirm Password" handlechange={handlechange} type= "password"/>}
                        </Grid>

                        <Button type="submit" fullWidth variant="contained" color="inherit" className={classes.submit} > 
                            {
                                isSignUp ? 
                                
                                'Sign Up'
                                :
                                'Sign In'
                            }
                        </Button>

                        <Grid container justify="flex-end">
                            <Grid>
                                <Button onClick={switchmode}>
                                {
                                    isSignUp ? 
                                    
                                    'Already have an account? Sign In'
                                    :
                                    "Don't have an account? Sign Up"
                                } 
                                </Button>
                            </Grid>
                        </Grid>
                    </Form> 
                </Formik>
            </Paper>
            
        </Container>
    )
}

export default Admin;