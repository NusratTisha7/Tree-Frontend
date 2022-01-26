import React, { useEffect, useState } from "react";
import { Card, Col, Modal, ModalBody, Row, Form } from "react-bootstrap";
import { createRootFolder, getFolders, createFolder } from '../../Api/folder';
let id = null, parentPath, fName, parent, rootF;

const Home = () => {
    let [folders, setFolders] = useState([]);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose = () => {
        setShow(false)
        setShow2(false)
    };


    const a = () => {
        getFolders(id)
            .then(res => {
                setFolders(res.data)
            })
    }

    //Create root folder

    const modalOpen = () => {
        setShow(true)
    }

    const modalOpen2 = (paths, parents) => () => {
        setShow2(true)
        parentPath = paths
        parent = parents
        rootF = id
    }

    const [folder, setFolder] = useState({
        root: '',
    });

    const { root } = folder;

    const handleOnChange = e => {
        setFolder({
            ...folder,
            [e.target.name]: e.target.value
        })
    }

    const CreateRoot = () => {
        createRootFolder(root)
            .then(
                res => {
                    id = res.data._id
                    setShow(false)
                    a()
                }
            )
    }

    const [folder2, setFolder2] = useState({
        name: '',
    });

    const { name } = folder2;

    const handleOnChange2 = e => {
        setFolder2({
            ...folder2,
            [e.target.name]: e.target.value
        })
    }


    const CreateFolder = () => {
        const data = {
            parentFolderPath: parentPath,
            folderName: name,
            parentFolder: parent,
            rootFolder: id
        }
        createFolder(data)
            .then(
                res => {
                    setShow2(false)
                    a()
                }
            )
    }


    return (
        <>
            <Modal show={show} >
                <ModalBody>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Create Root folder</Form.Label>
                            <Form.Control type="text" name="root" placeholder="Folder name" onChange={handleOnChange} />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={CreateRoot}>
                        Create
                    </button>
                    <button className="btn btn-primary" onClick={handleClose}>
                        Cancel
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal show={show2} >
                <ModalBody>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Create folder</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Folder name" onChange={handleOnChange2} />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={CreateFolder}>
                        Create
                    </button>
                    <button className="btn btn-primary" onClick={handleClose}>
                        Cancel
                    </button>
                </Modal.Footer>
            </Modal>

            <div style={{ margin: "10px" }}>
                <h1>Create Folder</h1>
                <br />
                <button className="btn btn-primary" onClick={modalOpen}>Create Root Folder</button>
            </div>
            <div>
                {folders && folders.map(item => (
                    <p style={{ marginLeft: `${item.layer * 20}px` }}><i class='fas fa-angle-double-right'></i>{item.name}<button className="btn" style={{ cursor: "pointer" }} onClick={modalOpen2(item.path, item.parent)} > <i class="fa fa-plus" ></i></button></p>
                ))}
            </div>

        </>
    )

}
export default Home;