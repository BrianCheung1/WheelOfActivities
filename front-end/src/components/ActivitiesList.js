import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table"
import { useDispatch } from "react-redux"
import { removeWheel } from "../reducers/wheels"
import { useState } from "react"

const ActivitiesList = ({ wheels }) => {
  const [sorted, setSorted] = useState(false)
  const dispatch = useDispatch()
  const handleDelete = async (slice) => {
    dispatch(removeWheel(slice))
  }
  let sortedWheel = [...wheels].sort((a, b) => {
    let fa = a.content.toLowerCase(),
      fb = b.content.toLowerCase()

    if (fa < fb) {
      return -1
    }
    if (fa > fb) {
      return 1
    }
    return 0
  })

  const handleSort = () => {
    setSorted(!sorted)
  }

  return (
    <div className="table-container">
      <Table variant="dark" borderless={true}>
        <thead>
          <tr>
            <th>
              {wheels.length > 1 && <Button onClick={() => handleSort()}>Sort</Button>}
            </th>
          </tr>
        </thead>

        <tbody>
          {sorted === false &&
            wheels.map((slice) => (
              <tr key={slice.id} className="table-text-container">
                <td>{slice.content} </td>
                <td>
                  <Button onClick={() => handleDelete(slice)}>Delete</Button>
                </td>
              </tr>
            ))}
          {sorted === true &&
            sortedWheel.map((slice) => (
              <tr key={slice.id} className="table-text-container">
                <td>{slice.content} </td>
                <td>
                  <Button onClick={() => handleDelete(slice)}>Delete</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {console.log(wheels, sortedWheel)}
      {console.log(sorted)}
    </div>
  )
}

export default ActivitiesList
