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
import { clearSearchResult, getAutoCompleteLocationThunk, getDirectionThunk, selectSearchResults } from "../../features/map/mapslice";
import { addInterestPoint } from "../../features/trip/tripslice";

import './styles.css'
import Menu from "@mui/material/Menu/Menu";
import MenuItem from "@mui/material/MenuItem/MenuItem";


export default function MapLayer(props: { segmentIndex: number, interestPoints: Array<GeoNode> }) {

    const dispatch = useAppDispatch();
    const searchResults = useAppSelector(selectSearchResults);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [searchValue, setSearchValue] = useState('');

    function handleSearch(event: React.MouseEvent<HTMLButtonElement>) {
        dispatch(getAutoCompleteLocationThunk(searchValue));
        setAnchorEl(event.currentTarget);
    }

    function handleSelectCoordinate(node: GeoNode) {
        handleClose();
        dispatch(addInterestPoint({ segmentIndex: props.segmentIndex, node: node }));
    }

    function handleClose() {
        dispatch(clearSearchResult());
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
                <Button onClick={(e) => { handleSearch(e) }} variant="contained" endIcon={<SearchIcon />}>Search</Button>
                <Menu
                    anchorEl={anchorEl}
                    open={searchResults.length !== 0}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'search-button',
                    }}
                >
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
                </Menu>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                            Interest Points
                        </Typography>
                        <List dense={true}>
                            {
                                props.interestPoints.map((point) => {
                                    return <ListItemButton>
                                        <ListItemText
                                            onClick={() => {
                                                dispatch(getDirectionThunk())
                                            }}
                                            key={point.properties.id}
                                            primary={point.properties.label}
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
//tokenOrCallback={'***REMOVED***'} 
