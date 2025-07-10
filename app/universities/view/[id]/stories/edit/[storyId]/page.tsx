'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import InputField from '@/app/reused-Components /inputfield';
import PrimaryButton from '@/app/reused-Components /PrimaryButton';
import CancelButton from '@/app/reused-Components /CancelButton';

export default function EditStoryPage() {
  const params = useParams();
  const router = useRouter();
  const universityId = params.id as string;
  const storyId = params.storyId as string;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStory() {
      try {
        const response = await fetch('/api/stories');
        const data = await response.json();
        const story = data.find((s: any) => String(s.id) === String(storyId));
        if (story) {
          setTitle(story.title || '');
          setAuthor(story.author || '');
          setContent(story.content || '');
          setStatus(!!story.status);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchStory();
  }, [storyId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedStory = {
        title,
        author,
        content,
        status,
      };
      const response = await fetch(`/api/stories?id=${storyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStory),
      });
      if (!response.ok) {
        throw new Error('Failed to update story');
      }
      router.push(`/universities/view/${encodeURIComponent(universityId)}/stories`);
      router.refresh();
    } catch (error) {
      alert('Failed to update story. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-6">Edit Story</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Title"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <InputField
          label="Author"
          name="author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
        />
        <InputField
          label="Content"
          name="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <div className="flex items-center gap-2">
          <label className="text-sm">Status:</label>
          <input
            type="checkbox"
            checked={status}
            onChange={() => setStatus(!status)}
            className="h-4 w-4"
            disabled={isSubmitting}
          />
          <span className="text-sm">{status ? 'Active' : 'Inactive'}</span>
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <CancelButton
            label="Cancel"
            onClick={() => router.push(`/universities/view/${encodeURIComponent(universityId)}/stories`)}
            className="px-6 py-2 text-sm"
            type="button"
            disabled={isSubmitting}
          />
          <PrimaryButton
            label={isSubmitting ? 'Saving...' : 'Save Changes'}
            className="px-6 py-2 text-sm"
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
} 