import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { dummyNotesList } from "./constants";

describe("Create StickyNote", () => {
    test("renders create note form", () => {
        render(<StickyNotes />);

        const createNoteButton = screen.getByText("Create Note");
        expect(createNoteButton).toBeInTheDocument();
    });

    test("creates a new note", () => {
        render(<StickyNotes />);

        // Please make sure your sticky note has a title and content input field with the following placeholders.
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea =
            screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "Note content" },
        });
        fireEvent.click(createNoteButton);

        const newNoteTitle = screen.getByText("New Note");
        const newNoteContent = screen.getByText("Note content");

        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
    });

    //Exercise 2.6.1 starts here

    test("renders all created notes", () => {
        render(<StickyNotes />);
      
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");
      
        fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
        fireEvent.change(createNoteContentTextarea, { target: { value: "New Content" } });
        fireEvent.click(createNoteButton);
      
        expect(screen.getByText("New Note")).toBeInTheDocument();
        expect(screen.getByText("New Content")).toBeInTheDocument();
      });
      

    test("updates a note's content", () => {
        render(<StickyNotes />);
      
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");
      
        fireEvent.change(createNoteTitleInput, { target: { value: "Old Note" } });
        fireEvent.change(createNoteContentTextarea, { target: { value: "Old Content" } });
        fireEvent.click(createNoteButton);
      
        const noteTitle = screen.getByTestId("note-title-1");
      
        fireEvent.input(noteTitle, { target: { innerHTML: "Updated Note" } });
      
        expect(noteTitle.innerHTML).toBe("Updated Note");
    });
      
    test("deletes a note", () => {
        render(<StickyNotes />);
      
        const numOfNotes = dummyNotesList.length;
        const newNoteId = numOfNotes + 1;

        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");
      
        fireEvent.change(createNoteTitleInput, { target: { value: "Note to Delete" } });
        fireEvent.change(createNoteContentTextarea, { target: { value: "Content to Delete" } });
        fireEvent.click(createNoteButton);
      
        expect(screen.getByText("Note to Delete")).toBeInTheDocument();
      
        const deleteButton = screen.getByTestId(`delete-note-${newNoteId}`);
        fireEvent.click(deleteButton);
      
        expect(screen.queryByText("Note to Delete")).not.toBeInTheDocument();
    });
});