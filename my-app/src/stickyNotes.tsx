import React, { useState, useContext } from 'react';
import { Label, Note } from "./types"; // Import your types here
import { dummyNotesList } from "./constants"; // Import dummy notes
import { ThemeContext, themes } from './themeContext'; // Theme context

export const StickyNotes = () => {
    const [favoriteNotes, setFavoriteNotes] = useState<string[]>([]);
    const [theme, setTheme] = useState(themes.light);
    const [notes, setNotes] = useState(dummyNotesList); 
    const initialNote = {
        id: -1,
        title: "",
        content: "",
        label: Label.other,
        };
    const [createNote, setCreateNote] = useState(initialNote);

    const createNoteHandler = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("title: ", createNote.title);
        console.log("content: ", createNote.content);
        createNote.id = notes.length + 1;
        setNotes([createNote, ...notes]);
        setCreateNote(initialNote);
    };

    const [selectedNote, setSelectedNote] = useState<Note>(initialNote);

    const removeNote = (id: number) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const toggleTheme = () => {
        setTheme(theme === themes.light ? themes.dark : themes.light);
    };

    const toggleFavorite = (noteTitle: string) => {
        setFavoriteNotes((prevFavorites) => {
            if (prevFavorites.includes(noteTitle)) {
                return prevFavorites.filter((title) => title !== noteTitle);
            } else {
                return [...prevFavorites, noteTitle];
            }
        });
    };

    const currentTheme = useContext(ThemeContext);

    return (
        <ThemeContext.Provider value={theme}>
            <div className='app-container' style={{ backgroundColor: theme.background, color: theme.foreground }}>
                
                <form className="note-form" onSubmit={createNoteHandler}>
                    <div>
                        <input 
                            placeholder="Note Title"
                            onChange={(event) =>
                            setCreateNote({ ...createNote, title: event.target.value })}
                            required>
                        </input>
                    </div>

                    <div>
                        <textarea
                            placeholder="Note Content"
                            onChange={(event) =>
                            setCreateNote({ ...createNote, content: event.target.value })}
                            required>
                        </textarea>
                    </div>

                    <div>
                        <select
                            onChange={(event) =>
                                setCreateNote({ ...createNote, label: event.target.value as Label })}
                            required>
                            <option value={Label.personal}>Personal</option>
                            <option value={Label.study}>Study</option>
                            <option value={Label.work}>Work</option>
                            <option value={Label.other}>Other</option>
                        </select>
                    </div>

                    <div>
                        <button type="submit">Create Note</button>
                    </div>
                </form>

                <div className="notes-grid">
                    {notes.map((note) => (
                        <div key={note.id} className="note-item">
                            <div className="notes-header">
                                <button 
                                    className={`heart-button ${favoriteNotes.includes(note.title) ? 'favorite' : ''}`}
                                    onClick={() => toggleFavorite(note.title)}
                                >
                                    {favoriteNotes.includes(note.title) ? '❤' : '♡'}
                                </button>
                                <button
                                    data-testid={`delete-note-${note.id}`} 
                                    onClick={() => removeNote(note.id)}>x
                                </button>
                            </div>
                            <h2 
                                contentEditable 
                                suppressContentEditableWarning={true}
                                style={{ color: '#000' }}
                                data-testid={`note-title-${note.id}`}
                            > 
                                {note.title} 
                            </h2>
                            <p 
                                contentEditable 
                                suppressContentEditableWarning={true}
                                style={{ color: '#000' }}
                            >  
                                {note.content} 
                            </p>
                            <p 
                                contentEditable 
                                suppressContentEditableWarning={true}
                                style={{ color: '#000' }}
                            >
                                {note.label} 
                            </p>
                        </div>
                    ))}
                </div>

                {/* Display the list of favorite notes */}
                <div className="favorites-list">
                    <h3>List of favorites:</h3>
                    {favoriteNotes.length > 0 ? (
                        <ul>
                            {favoriteNotes.map((title, index) => (
                                <li key={index}>{title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No favorite notes selected.</p>
                    )}
                </div>

                <button onClick={toggleTheme} className="theme-button">
                    Toggle to {theme === themes.light ? 'Dark' : 'Light'} Theme
                </button>
            </div>
        </ThemeContext.Provider>
    );
};