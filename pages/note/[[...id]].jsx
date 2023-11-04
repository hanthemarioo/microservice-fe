import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Form, Navbar } from 'react-bootstrap';

function Detail() {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(false);
    let url = "http://localhost:8000/api/note/";

    useEffect(() => {
        if (router.isReady) {
            if (id?.[0]) {
                // hit BE to get detail note
                setLoading(true);
                fetch(url + id[0])
                    .then((res) => res.json())
                    .then((response) => {
                        setData(response.data.note);
                    });
            }
        }
    }, [router]);

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        if (id?.[0]) {
            url += id[0];
            formData.append("_method", "PUT");
        }

        fetch(url, {
            method: "POST",
            body: formData,
        }).then((res) => {
            if (res) {
                router.push("/");
            }
        });
    }

    const deleteNote = (e) => {
        if (confirm("Are you sure want to delete this?") == true) {
            e.preventDefault();

            fetch((url + id[0]), {
                method: "DELETE",
            }).then((res) => {
                if (res) {
                    router.push("/");
                }
            });
        } else {
            return
        }
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Link href='/'>
                        <Navbar.Brand>Note</Navbar.Brand>
                    </Link>
                </Container>
            </Navbar>

            <Container className='mt-2'>
                <Card className='p-3'>
                    <Form onSubmit={onSubmit} action="/">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control name="title" type="text" defaultValue={data.title} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Content</Form.Label>
                            <Form.Control name="content" as="textarea" defaultValue={data.content} rows={3} />
                        </Form.Group>
                        <Button variant="success" type="submit">Save</Button>
                        {id ? <Button className='btn-danger' onClick={deleteNote}>Delete</Button> : ''}
                    </Form>
                </Card>
            </Container>
        </>
    );
};

export default Detail;