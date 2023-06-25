import Button from "react-bootstrap/Button"

import Col from "react-bootstrap/Col"
import Table from "react-bootstrap/Table"
import wheelServices from "../services/wheels"

const ActivitiesList = ({ slices, setSlices }) => {
  const handleDelete = async (id) => {
    const deletedWheel = await wheelServices.remove(id)
    setSlices(slices.filter((s) => (s.id !== id ? s : deletedWheel)))
  }

  return (
    <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto" xxl="auto">
      <Table variant="dark" hover borderless={true}>
        <tbody>
          {slices.toReversed().map((slice) => (
            <tr key={slice.id}>
              <td>{slice.content} </td>
              <td>
                <Button onClick={() => handleDelete(slice.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  )
}

export default ActivitiesList
