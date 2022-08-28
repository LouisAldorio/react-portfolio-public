import React, { useContext } from 'react'
import { Grid,makeStyles } from '@material-ui/core'
import { useQuery } from '@apollo/client'
import { SETTING_QUERY } from '../../../../graphql/owner/setting'
import CircularProgress from '@material-ui/core/CircularProgress';
import ImageCategoryManagement from './components/imageCategoryManagement';
import EducationCategoryManagement from './components/educationCategoryManagement'
import { AuthContext } from '../../../../auth/auth';
import { Redirect } from 'react-router';

const useStyles = makeStyles({
    root: {
        marginBottom: 20
    },
    loading: {
        marginLeft: '47%'
    }
})

function SiteConfiguration(){
    const classes = useStyles()
    const {user} = useContext(AuthContext)

    const {loading,data} = useQuery(SETTING_QUERY)

    if(!user) {
        return (
            <Redirect to="/" />
        )
    }

    return loading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
        <Grid container spacing={2} style={{paddingTop: 50}}>
            <Grid md={5} xs={12} sm={12} style={{margin: 10}}>
                <ImageCategoryManagement data={data && data.gallery.tabs_photos}/>
            </Grid>
            <Grid md={5} xs={12} sm={12} style={{margin: 10}}>
                <EducationCategoryManagement data={data && data.about.education}/>
            </Grid>
        </Grid>
    )
}

export default SiteConfiguration