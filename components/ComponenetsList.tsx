'use client';
import Link from 'next/link';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from './ui/command';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export function ComponentsList({ files }: { files: string[] }) {
  const [open, setOpen] = React.useState(false);
  const path = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    setOpen(false);
  }, [path]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === 'w' && (e.metaKey || e.altKey)) {
        e.preventDefault();
        console.log(document.documentElement.scrollHeight);
        scrollTo(0, 0);
      }
      if (e.key === 'q' && (e.metaKey || e.altKey)) {
        e.preventDefault();
        scrollTo(
          document.documentElement.scrollHeight,
          document.documentElement.scrollHeight
        );
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen} >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions"  className="rounded-lg border shadow-md ">
          {files.map((file) => (
            <Link
              href={`/${file}`}
              key={file}
              className="!cursor-pointer"
              onKeyDown={(e) => {
                console.log(e);
              }}
            >
              <CommandItem>{file}</CommandItem>
            </Link>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
