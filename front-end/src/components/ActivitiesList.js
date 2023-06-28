import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table"
import { useDispatch, useSelector } from "react-redux"
import { removeWheel } from "../reducers/wheels"

const ActivitiesList = ({ wheels }) => {
  const dispatch = useDispatch()

  const handleDelete = async (slice) => {
    dispatch(removeWheel(slice))
  }

  return (
    <div className="table-container">
      <Table variant="dark" hover borderless={true}>
        <tbody>
          {wheels.toReversed().map((slice) => (
            <tr key={slice.id}>
              <td>{slice.content} </td>
              <td>
                <Button onClick={() => handleDelete(slice)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default ActivitiesList
