import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';

import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button"
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

import type { Budget as TypeBudget } from '../../data/Budget/Budget';

import { updateBudget, deleteBudget } from '../../features/trip/tripslice';

export default function Budget(props: {
    segmentIndex: number, budget: TypeBudget, budIdx: number
}) {

    const dispatch = useAppDispatch();

    function parseDate(date: string): string {
        var toParse = new Date(date);
        return (toParse.getMonth() + 1) + '.' + toParse.getDate()
    }

    const [editName, setEditName] = useState(false);
    const [editPrice, setEditPrice] = useState(false);
    const [editQuantity, setEditQuantity] = useState(false);
    const [name, setName] = useState(props.budget.name);
    const [price, setPrice] = useState(props.budget.price);
    const [quantity, setQuantity] = useState(props.budget.quantity);

    function updateBudgetInfo(type: string) {
        dispatch(updateBudget({
            tripSegmentIndex: props.segmentIndex,
            budgetIndex: props.budIdx,
            name: name,
            price: price,
            quantity: quantity,
        }))
        switch (type) {
            case 'name':
                setEditName(false)
                break;
            case 'price':
                setEditPrice(false)
                break;
            case 'quantity':
                setEditQuantity(false)
                break;
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {
                        editName ?
                            <TextField autoFocus={true} value={name} id="standard-basic" onChange={(e) => { setName(e.target.value) }}
                                onBlur={() => { updateBudgetInfo('name') }}
                                placeholder='name' variant="standard" />
                            :
                            name === '' ?
                                <Button color='primary' variant="outlined" onClick={() => { setEditName(true) }}>Add Name</Button> :
                                <span onClick={() => { setEditName(true) }}>{name}</span>
                    }
                </TableCell>
                <TableCell>{
                    editPrice ?
                        <TextField autoFocus={true} value={price} id="standard-basic" onChange={(e) => { setPrice(+e.target.value) }}
                            onBlur={() => { updateBudgetInfo('price') }} placeholder='price' variant="standard" />
                        :
                        <span onClick={() => { setEditPrice(true) }}>${price}</span>
                }</TableCell>
                <TableCell>{
                    editQuantity ?
                        <TextField
                            autoFocus={true}
                            value={quantity}
                            multiline
                            rows={4}
                            onChange={(e) => { setQuantity(+e.target.value) }}
                            onBlur={() => { updateBudgetInfo('quantity') }}
                            placeholder='name'
                            variant="standard"
                        />
                        :
                        <span onClick={() => { setEditQuantity(true) }}>x{quantity}</span>
                }</TableCell>
                <TableCell align='right'>
                    <IconButton aria-label="delete" color="error"
                        onClick={() => {
                            dispatch(deleteBudget({
                                tripSegmentIndex: props.segmentIndex,
                                budgetIndex: props.budIdx,
                            }))
                        }}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        </React.Fragment >
    );
}