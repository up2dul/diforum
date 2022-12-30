import { memo } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import CharacterCount from '@tiptap/extension-character-count';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { IconBold, IconCode, IconItalic, IconStrikethrough } from '@tabler/icons';
import type { Editor } from '@tiptap/core';

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const defaultClasses = 'text-como-500';
  const activeClasses = 'text-green-500 ring-2 ring-green-500';

  if (!editor) return null;

  return (
    <div className='flex justify-center gap-4 rounded-t-xl border-2 border-como-600 py-1 px-2'>
      <button
        title='Bold'
        disabled={!editor.can().chain().focus().toggleBold().run()}
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? activeClasses : defaultClasses}
      >
        <IconBold />
      </button>
      <button
        title='Italic'
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? activeClasses : defaultClasses}
      >
        <IconItalic />
      </button>
      <button
        title='Strikethrough'
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? activeClasses : defaultClasses}
      >
        <IconStrikethrough />
      </button>
      <button
        title='Code'
        disabled={!editor.can().chain().focus().toggleCode().run()}
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? activeClasses : defaultClasses}
      >
        <IconCode />
      </button>
    </div>
  );
};

type TiptapProps = {
  limitChar: number;
  content?: string;
  placeholder: string;
  error?: string;
  onUpdate: (result: string) => void;
};

const Tiptap = ({ limitChar, content, placeholder, error, onUpdate }: TiptapProps) => {
  const editor = useEditor({
    content,
    extensions: [
      StarterKit,
      CharacterCount.configure({
        limit: limitChar,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    onUpdate({ editor }: { editor: Editor }) {
      onUpdate(editor.getHTML());
    },
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <p className='text-sm text-danger'>{error}</p>
    </div>
  );
};

export default memo(Tiptap);
