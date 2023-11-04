import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Navbar, Row } from 'react-bootstrap'

export default function Home() {

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:8000/api/note')
      .then((res) => res.json())
      .then((response) => {
        setData(response.data)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Note</Navbar.Brand>
          </Container>
      </Navbar>

        <Container className='mt-3'>
          <Link href='/note'>
            <Button>Create New Note</Button>
          </Link>
          <Row>
            {data && data.notes.map((item, key) => {
              return (
                <Col xs={12} md={6} lg={3} key={key} className='py-2'>
                  <Link href={'/note/' + item.id}>
                    <Card className='mt-2'>
                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>
                          {item.content}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              )
            })}
          </Row>
        </Container>
      
    </>
  )
}
