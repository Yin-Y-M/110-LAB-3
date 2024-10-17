import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { dummyGroceryList } from "./constants";

test("display all items in the list", () => {
    render(<ToDoList />);
  
    dummyGroceryList.forEach(item => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
    });
});

test("updates the count of checked items", () => {
    render(<ToDoList />);
  
    const checkbox = screen.getByLabelText(dummyGroceryList[0].name);
    fireEvent.click(checkbox);
  
    expect(screen.getByText("Items bought: 1")).toBeInTheDocument();
});
   