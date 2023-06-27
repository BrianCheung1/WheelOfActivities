import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table"
import { useDispatch, useSelector } from "react-redux"
import { removeWheel } from "../reducers/wheels"

const ActivitiesList = () => {
  const wheels = useSelector(({ wheels }) => wheels)
  const dispatch = useDispatch()

  const handleDelete = async (slice) => {
    dispatch(removeWheel(slice))
  }

  return (
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
  )
}

export default ActivitiesList
