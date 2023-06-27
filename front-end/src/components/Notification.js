import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form"
import { useEffect, useState } from "react"
import loginService from "../services/login"
import wheelService from "../services/wheels"
import Alert from "react-bootstrap/Alert"

const Notification = ({ message, type }) => {
  return (
    <div>
      {message && (
        <Alert key={type} variant={type}>
          {message}
        </Alert>
      )}
    </div>
  )
}

export default Notification
