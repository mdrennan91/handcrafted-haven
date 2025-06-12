export async function deleteUser(user_id: number, user_type: string) {
  const res = await fetch('/api/users', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, user_type }),
  });

  if (!res.ok) {
    throw new Error('Failed to delete user');
  }

  return res.json();
}
