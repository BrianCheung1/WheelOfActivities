import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table"
import { useDispatch, useSelector } from "react-redux"
import { removeWheel, removeAllWheel } from "../reducers/wheels"
import { useState } from "react"

const ActivitiesList = ({ wheels, turning }) => {
  const [sorted, setSorted] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
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

  const handleClear = () => {
    dispatch(removeAllWheel(user))
  }

  return (
    <div className="table-container">
      <Table variant="dark" borderless={true}>
        <thead>
          <tr>
            {wheels.length >= 1 && (
              <th>
                <Button onClick={() => handleSort()} disabled={turning}>
                  Sort
                </Button>
              </th>
            )}

            {wheels.length >= 1 && (
              <th>
                <Button onClick={() => handleClear()} disabled={turning}>
                  Clear
                </Button>
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {sorted === false &&
            wheels.map((slice) => (
              <tr key={slice.id} className="table-text-container">
                <td>{slice.content}</td>
                <td>
                  <Button
                    onClick={() => handleDelete(slice)}
                    disabled={turning}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          {sorted === true &&
            sortedWheel.map((slice) => (
              <tr key={slice.id} className="table-text-container">
                <td>{slice.content}</td>
                <td>
                  <Button
                    onClick={() => handleDelete(slice)}
                    disabled={turning}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default ActivitiesList
