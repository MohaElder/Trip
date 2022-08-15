import React, { useState, useEffect } from 'react';

import Note from '../note/note';
import Grid from '@mui/material/Unstable_Grid2';
import Button from "@mui/material/Button"
import "./styles.css"
import type { Note as TypeNote } from '../../data/Note/Note'

import { useAppDispatch } from '../../app/hooks';

import { addNote, addNoteSegment } from '../../features/trip/tripslice';

interface IProps {
    notes: Array<TypeNote>;
    segment?: string;
}

const Notes: React.FC<IProps> = (props) => {

    const dispatch = useAppDispatch();

    //don't put jsx inside. https://stackoverflow.com/a/62240641/15466075
    const [notes, setNotes] = useState(props.notes);

    //https://stackoverflow.com/a/54568167/15466075
    //since note's memory address is the same, react component does not rerender
    useEffect(() => { setNotes(props.notes) }, [props.notes]);

    const noteGrids = notes.map((note) =>
        <Grid xs={4} key={note.id}>
            <Note body={note} id={note.id} segment={props.segment} />
        </Grid>
    );

    return (
        <div>
            <Grid container spacing={4} sx={{ paddingLeft: 5, paddingRight: 5 }}>
                {noteGrids}
            </Grid>
            <Button className='note-button'
                onClick={() => {
                    props.segment == undefined ?
                        dispatch(addNote()) :
                        dispatch(addNoteSegment({ name: props.segment }))
                }
                }
                sx={{
                    borderStyle: 'dashed',
                    borderWidth: 2,
                    borderRadius: 24,
                    borderColor: '#707070',
                    marginTop: 5,
                    color: '#707070',
                }}>ADD NEW NOTE</Button>
        </div>
    );
}

export default Notes