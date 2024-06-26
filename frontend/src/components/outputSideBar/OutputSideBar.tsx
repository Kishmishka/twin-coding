import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import {CircularProgress, IconButton} from '@mui/material';
import compile from '../../img/compile.svg';
import close from '../../img/close.svg';
import {useCompiling, useRedactor, useSettingsRedactor} from '../../store';
import axios from 'axios';
import {CompilingStatus} from '../../constants';
import './OutputSideBar.scss';

const OutputSideBar = () => {
    const [openSide, setOpenSide] = React.useState(false);
    const language = useSettingsRedactor(state => state.language);
    const redactorValue = useRedactor(state => state.redactorValue);
    const compilingOutput = useCompiling(state => state.compilingOutput);
    const compilingProcess = useCompiling(state => state.compilingProcess);
    const setCompilingOutput = useCompiling(state => state.setCompilingOutput);
    const setCompilingProcess = useCompiling(state => state.setCompilingProcess);
    const setCompilingOutputManyReques = useCompiling(state => state.setCompilingOutputManyReques);
    const toggleDrawer = (value: boolean) => () => {
        value && handleCompile();
        setOpenSide(value);
    };
    const handleCompile = () => {
        setCompilingProcess(true);
        const formData = {
            language_id: language.id,
            // encode source code in base64
            source_code: btoa(redactorValue),
            stdin: btoa(''),
        };

        const options = {
            method: 'POST',

            url: import.meta.env.VITE_API_URL,
            params: {
                base64_encoded: 'true',
                fields: '*',
            },
            headers: {
                'content-type': 'application/json',
                'Content-Type': 'application/json',
                'X-RapidAPI-Host': import.meta.env.VITE_API_HOST,
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
            },
            data: formData,
        };

        axios
            .request(options)
            .then(function (response) {
                const token = response.data.token;
                checkCompilingRezult(token);
            })
            .catch(err => {
                let status = err.response.status;
                if (status === CompilingStatus.manyRequest) {
                    setCompilingOutputManyReques();
                }
                setCompilingProcess(false);
            });
    };

    const checkCompilingRezult = async (token: string) => {
        const options = {
            method: 'GET',
            url: import.meta.env.VITE_API_URL + '/' + token,
            params: {base64_encoded: 'true', fields: '*'},
            headers: {
                'X-RapidAPI-Host': import.meta.env.VITE_API_HOST,
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
            },
        };
        try {
            let response = await axios.request(options);
            let statusId = response.data.status?.id;
            // Processed - we have a result
            if (statusId === 1 || statusId === 2) {
                // still processing
                setTimeout(() => {
                    checkCompilingRezult(token);
                }, 2000);
                return;
            } else {
                setCompilingProcess(false);
                setCompilingOutput(response.data);
                return;
            }
        } catch (err) {
            console.log('err', err);
            setCompilingProcess(false);
        }
    };

    return (
        <div className="OutputSideBar">
            <IconButton
                className="OutputSideBar__goCompilingBtn"
                onClick={toggleDrawer(true)}
                aria-label="go compiling"
            >
                <img src={compile} />
            </IconButton>
            <Drawer
                className="OutputSideBar__drawer Drawer"
                anchor={'bottom'}
                open={openSide}
                onClose={toggleDrawer(false)}
            >
                <Box className="Drawer__header">
                    <span className="Drawer__progressLabel">
                        {' '}
                        {compilingProcess ? (
                            <CircularProgress size={23} color="inherit" />
                        ) : (
                            'Cpompiling: complite'
                        )}{' '}
                    </span>

                    <IconButton
                        className="Drawer__button"
                        onClick={toggleDrawer(false)}
                        aria-label="close"
                    >
                        <img src={close} />
                    </IconButton>
                </Box>
                <Box className="Drawer__output">
                    <textarea value={compilingOutput} readOnly className="text" />
                </Box>
            </Drawer>
        </div>
    );
};
export default OutputSideBar;
