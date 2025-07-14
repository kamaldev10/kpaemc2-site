"use client";

import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";

// Komponen ini perlu dibungkus dengan dynamic import tanpa SSR
// karena MDEditor bergantung pada window object.

type MarkdownEditorProps = {
  value: string;
  onChange: (value?: string) => void;
  height: number;
};

export default function MarkdownEditor({
  value,
  onChange,
  height,
}: MarkdownEditorProps) {
  const { theme } = useTheme();

  return (
    <div data-color-mode={theme}>
      <MDEditor
        value={value}
        onChange={onChange}
        height={height}
        preview="live"
      />
    </div>
  );
}
