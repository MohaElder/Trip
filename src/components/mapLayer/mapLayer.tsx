import Button from "@mui/material/Button/Button";
import Grid from "@mui/material/Grid/Grid";
import List from "@mui/material/List/List";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography/Typography";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { GeoNode } from "../../data/GeoNode/GeoNode";
import { getAutoCompleteLocationThunk, selectSearchResults } from "../../features/map/mapslice";
import { addInterestPoint } from "../../features/trip/tripslice";

import './styles.css'


export default function MapLayer(props: { segmentIndex: number }) {

    const dispatch = useAppDispatch();
    const searchResults = useAppSelector(selectSearchResults);

    const [searchValue, setSearchValue] = useState('');

    function handleSearch() {
        dispatch(getAutoCompleteLocationThunk(searchValue));
    }

    function handleSelectCoordinate(node: GeoNode) {
        dispatch(addInterestPoint({ segmentIndex: props.segmentIndex, node: node }));
    }

    return (
        <>
            <div>
                <div className='container'>
                    <TextField
                        value={searchValue}
                        onChange={(e) => { setSearchValue(e.target.value) }}
                        label="Search"
                        variant="outlined" />
                </div>
                <Button onClick={handleSearch} variant="contained" endIcon={<SearchIcon />}>Search</Button>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                            Search Result
                        </Typography>
                        <List dense={true}>
                            {
                                searchResults.map((res) => {
                                    return <ListItemButton>
                                        <ListItemText
                                            onClick={() => {
                                                handleSelectCoordinate(res)
                                            }}
                                            key={res.properties.id}
                                            primary={res.properties.label}
                                        />
                                    </ListItemButton>
                                })
                            }
                        </List>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

//center={[37.415, -122.048333]}
//tokenOrCallback={'eyJhbGciOiJIUzI1NiIsImtpZCI6IkxBOVlSNFcyMjQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJOSFhWVFlCUU1VIiwiaWF0IjoxNDM3MTc5MDM2LCJleHAiOjE0OTMyOTgxMDB9.slpGCPIkAvxBFct_CyT87roI0vovJdQpPWCrpDjjloI'} 
