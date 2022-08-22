import { useAppDispatch } from '../../app/hooks';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button"
import AddIcon from '@mui/icons-material/Add';

import type { TripSegment } from '../../data/Trip/Trip';

import { addBudget } from '../../features/trip/tripslice';
import Budget from '../budget/budget';
import { type Budget as TypeBudget } from '../../data/Budget/Budget';
import { useEffect, useState } from 'react';

export default function BudgetChart(props: { tripSegment: TripSegment, segmentIndex: number }) {
    const dispatch = useAppDispatch();

    const [budgetsData, setBudegetsData] = useState(props.tripSegment.budgets);
    useEffect(() => {
        setBudegetsData(props.tripSegment.budgets)
    }, [props.tripSegment.budgets]);

    const budgets = budgetsData.map((budget, idx) => (
        <Budget key={budget.id}
            segmentIndex={props.segmentIndex}
            budget={budget}
            budIdx={idx}
        />
    ))


    function handleNewBudget() {
        dispatch(addBudget({ segmentIndex: props.segmentIndex }))
    }


    function calculateTotalPrice() {
        return props.tripSegment.budgets.reduce((total, budget) => {
            return total + (budget.price * budget.quantity)
        }, 0);
    }

    return (
        <Paper>
            <Button onClick={handleNewBudget} variant="contained" endIcon={<AddIcon />} sx={{ m: 1 }}>
                New Budget
            </Button>
            <TableContainer component={Paper}>
                <Table aria-label="calendar">
                    <TableHead>
                        <TableRow>
                            <TableCell> Name </TableCell>
                            <TableCell> Price </TableCell>
                            <TableCell> Quantity </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {budgets}
                        <TableRow>
                            <TableCell>Total: ${calculateTotalPrice()} </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}