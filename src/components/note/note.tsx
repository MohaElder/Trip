import React, { useState } from 'react';

import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { updateNote, updateNoteSegment, deleteNote, deleteNoteSegment } from '../../features/trip/tripslice';

import type { Note as TypeNote } from '../../data/Note/Note'

import "./style.css"

const toolbarSetting = {
    options: ['inline', 'list', 'history'],
    inline: {
        inDropdown: false,
        component: undefined,
        dropdownClassName: undefined,
        options: ['bold', 'italic', 'strikethrough'],
        // bold: { className: "tool" },
    },
    list: {
        inDropdown: false,
        options: ['unordered', 'ordered'],
    },
}

//pnDeleteClicked prop type: https://stackoverflow.com/a/57511243
function Note(props: { body: TypeNote, index: number, segmentIndex: number | undefined }) {

    const [editorState, setEditorState] =
        useState(
            EditorState.
                createWithContent(convertFromRaw(props.body.data)));

    const dispatch = useAppDispatch();

    const onEditorStateChange = (editorState: EditorState) => {
        setEditorState(editorState);
        //converToRaw to store the content as serialized object
        props.segmentIndex == undefined ?
            dispatch(updateNote(
                { index: props.index, data: convertToRaw(editorState.getCurrentContent()) }
            )) :
            dispatch(updateNoteSegment(
                {
                    noteIndex: props.index,
                    segmentIndex: props.segmentIndex,
                    data: convertToRaw(editorState.getCurrentContent()),
                }
            ));
    };

    return (
        <Paper sx={{ minWidth: 275, minHeight: 400 }} className='paper'>
            <Editor
                defaultEditorState={editorState}
                editorClassName='editor'
                toolbar={toolbarSetting}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                placeholder={props.body.placeholder}
            />
            <div className='delete-button' >
                <IconButton aria-label="delete" color="error"
                    onClick={() => {
                        props.segmentIndex == undefined ?
                            dispatch(deleteNote({ index: props.index })) :
                            dispatch(deleteNoteSegment({ segmentIndex: props.segmentIndex, noteIndex: props.index }))
                    }}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </Paper>
    );
}

export default Note;