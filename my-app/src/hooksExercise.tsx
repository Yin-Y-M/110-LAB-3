import React, { useState, useContext } from 'react';
import { ThemeContext, themes } from "./themeContext";

export function ClickCounter() {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    const theme = useContext(ThemeContext);
    return (
        <div
            style={{
                background: theme.background,
                color: theme.foreground,
                padding: "20px",
            }}
        >
            <p>You clicked {count} times </p>
            <button
                onClick={() => setCount(count + 1)}
                style={{ background: theme.foreground, color: theme.background }}
            >
                Click me
            </button>
        </div>
 );
}


export function FavoriteNotes({ notes }: { notes: { id: number, title: string, content: string }[] }) {

    // keep track of favorite notes
    const [favoriteNotes, setFavoriteNotes] = useState<string[]>([]);

    // Toggle favorite status for a note
    const toggleFavorite = (noteTitle: string) => {
        setFavoriteNotes((prevFavorites) => {
            // If the note is already in favorites, remove it
            if (prevFavorites.includes(noteTitle)) {
                return prevFavorites.filter((title) => title !== noteTitle);
            } else {
                // Otherwise, add it to the favorites
                return [...prevFavorites, noteTitle];
            }
        });
    };
    
    return (
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className="note-item">
              <div className="notes-header">
                {/* Heart-shaped button for Favorite */}
                <button
                  className={`heart-button ${favoriteNotes.includes(note.title) ? 'favorite' : ''}`}
                  onClick={() => toggleFavorite(note.title)}
                >
                  ♥
                </button>
                <button>x</button>
              </div>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </div>
          ))}
    
          {/* Render the favorite notes list */}
          <div className="favorites-list">
            <h3>Favorite Notes:</h3>
            {favoriteNotes.length > 0 ? (
              <ul>
                {favoriteNotes.map((title, index) => (
                  <li key={index}>{title}</li>
                ))}
              </ul>
            ) : (
              <p>No favorite notes yet.</p>
            )}
          </div>
        </div>
      );
    }

// Wrapper component to provide context
function ToggleTheme() {
    const [currentTheme, setCurrentTheme] = useState(themes.light);
   
    const toggleTheme = () => {
      setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };
   
    return (
      <ThemeContext.Provider value={currentTheme}>
        <button onClick={toggleTheme}> Toggle Theme </button>
        <ClickCounter />
      </ThemeContext.Provider>
    );
   }
   
   export default ToggleTheme;