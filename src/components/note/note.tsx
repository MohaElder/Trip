import React, { useState } from 'react';

import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    update,
} from '../../features/note/noteSlice';

import "./style.css"

// const count = useAppSelector(selectCount);

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
function Note(props: { placeholder: string, id: string, onDeleteClicked: Function }) {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const dispatch = useAppDispatch();

    const onEditorStateChange = (editorState: EditorState) => {
        setEditorState(editorState);
        //converToRaw to store the content as serialized object
        dispatch(update(convertToRaw(editorState.getCurrentContent())))
    };

    return (
        <Paper sx={{ minWidth: 275, minHeight: 400 }} className='paper'>
            <Editor
                editorClassName='editor'
                toolbar={toolbarSetting}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                placeholder={props.placeholder}
            />
            <div className='delete-button' >
                <IconButton aria-label="delete" onClick={() => props.onDeleteClicked(props.id)}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </Paper>
    );
}

export default Note;