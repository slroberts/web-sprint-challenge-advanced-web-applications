import React, {useState} from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: {hex: ""},
};

const ColorList = ({colors, updateColors, setDependency}) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const updateColor = () => {
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        setColorToEdit(res.data);
        setDependency(true);
      })
      .catch((err) => {
        console.error(
          "SR: UpdateMovieForm.js: submit failed: err ",
          err.message
        );
      });
  };

  const handleDeleteColor = (color) => {
    axiosWithAuth()
      .delete(`/api/colors/${colorToEdit.id}`, color)
      .then((res) => {
        console.log(res);
        updateColors(colors.filter((item) => item.id !== colorToEdit.id));
      })
      .catch((err) => console.error(err.message));
  };

  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    updateColor();
    setEditing(false);
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    handleDeleteColor(color);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post("/api/colors", addColor)
      .then((res) => {
        console.log(res.data);
        setAddColor(initialColor);
        setDependency(true);
      })
      .catch((err) => {
        console.error(
          "SR: UpdateMovieForm.js: submit failed: err ",
          err.message
        );
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="color"
          placeholder="Color"
          value={addColor.color}
          onChange={(e) => setAddColor({...addColor, color: e.target.value})}
        />
        <input
          type="text"
          name="hexcode"
          placeholder="Hex Code"
          value={addColor.code.hex}
          onChange={(e) =>
            setAddColor({
              ...addColor,
              code: {hex: e.target.value},
            })
          }
        />
        <button>Add Color</button>
      </form>
      <div className="colors-wrap">
        <p>colors</p>
        <ul>
          {colors.map((color) => (
            <li key={color.color} onClick={() => editColor(color)}>
              <span>
                <span
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteColor(color);
                  }}
                >
                  x
                </span>{" "}
                {color.color}
              </span>
              <div
                className="color-box"
                style={{backgroundColor: color.code.hex}}
              />
            </li>
          ))}
        </ul>
        {editing && (
          <form onSubmit={saveEdit}>
            <legend>edit color</legend>
            <label>
              color name:
              <input
                onChange={(e) =>
                  setColorToEdit({...colorToEdit, color: e.target.value})
                }
                value={colorToEdit.color}
              />
            </label>
            <label>
              hex code:
              <input
                onChange={(e) =>
                  setColorToEdit({
                    ...colorToEdit,
                    code: {hex: e.target.value},
                  })
                }
                value={colorToEdit.code.hex}
              />
            </label>
            <div className="button-row">
              <button type="submit">save</button>
              <button onClick={() => setEditing(false)}>cancel</button>
            </div>
          </form>
        )}
        <div className="spacer" />
        {/* stretch - build another form here to add a color */}
      </div>
    </>
  );
};

export default ColorList;
