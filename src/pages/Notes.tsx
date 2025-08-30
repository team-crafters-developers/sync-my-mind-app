import { useState } from "react";
import { 
  Plus, Search, BookOpen, Brain, Filter, 
  Tag, Clock, Edit3, Trash2, Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockNotes } from "@/data/mockData";
import { Note } from "@/types";

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    subject: "",
    tags: [] as string[]
  });

  const subjects = Array.from(new Set(notes.map(note => note.subject)));
  
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === "all" || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleCreateNote = () => {
    if (newNote.title && newNote.content) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        subject: newNote.subject || "General",
        tags: newNote.tags,
        createdAt: new Date(),
        updatedAt: new Date(),
        aiGenerated: false
      };
      setNotes([note, ...notes]);
      setNewNote({ title: "", content: "", subject: "", tags: [] });
      setIsCreateDialogOpen(false);
    }
  };

  const generateQuizFromNote = (noteId: string) => {
    // Mock AI quiz generation
    const note = notes.find(n => n.id === noteId);
    if (note) {
      alert(`🎯 AI Quiz Generated!\n\nGenerated 5 quiz questions from "${note.title}":\n\n1. What are the key concepts covered?\n2. How does this relate to other topics?\n3. What are the practical applications?\n4. What are the main advantages/disadvantages?\n5. How would you explain this to someone else?\n\n(This is a mock feature - in production, this would integrate with OpenAI API)`);
    }
  };

  const aiCategorizeNote = (noteId: string) => {
    // Mock AI categorization
    const note = notes.find(n => n.id === noteId);
    if (note) {
      const updatedNotes = notes.map(n => 
        n.id === noteId 
          ? { 
              ...n, 
              tags: [...n.tags, "AI-Categorized", "Important"],
              aiGenerated: true
            }
          : n
      );
      setNotes(updatedNotes);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            Smart Notes
          </h1>
          <p className="text-muted-foreground mt-1">
            AI-powered note management and quiz generation
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-white button-glow">
              <Plus className="w-4 h-4 mr-2" />
              New Note
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Note</DialogTitle>
              <DialogDescription>
                Add a new study note. AI will help categorize and generate quiz questions.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Note Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Neural Networks Fundamentals"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="e.g., Computer Science"
                  value={newNote.subject}
                  onChange={(e) => setNewNote({ ...newNote, subject: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your notes here..."
                  className="min-h-[200px]"
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateNote} className="gradient-primary text-white">
                  Create Note
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card className="card-gradient">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search notes, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* AI Features Panel */}
      <Card className="card-gradient border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI-Powered Features
          </CardTitle>
          <CardDescription>
            Enhance your notes with artificial intelligence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">Auto-Categorization</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                AI automatically tags and categorizes your notes by subject and topic.
              </p>
              <Badge variant="secondary" className="text-xs">
                Available on all notes
              </Badge>
            </div>
            <div className="p-4 rounded-lg bg-academic/5 border border-academic/20">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-academic" />
                <span className="font-medium text-sm">Quiz Generation</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Generate practice questions and quizzes from your study notes.
              </p>
              <Badge variant="secondary" className="text-xs">
                Click on any note
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="card-gradient hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                  <CardDescription className="text-sm mt-1">
                    {note.subject}
                  </CardDescription>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {note.content}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {note.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
                {note.aiGenerated && (
                  <Badge className="text-xs bg-primary/10 text-primary border-primary/20">
                    <Brain className="w-3 h-3 mr-1" />
                    AI Enhanced
                  </Badge>
                )}
              </div>
              
              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-xs"
                  onClick={() => generateQuizFromNote(note.id)}
                >
                  <Brain className="w-3 h-3 mr-1" />
                  Generate Quiz
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-xs"
                  onClick={() => aiCategorizeNote(note.id)}
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Categorize
                </Button>
              </div>
              
              {/* Metadata */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{note.createdAt.toLocaleDateString()}</span>
                </div>
                <span>{note.content.length} chars</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <Card className="card-gradient">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No notes found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchQuery || selectedSubject !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Create your first note to get started with AI-powered learning"
              }
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="gradient-primary text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create First Note
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}