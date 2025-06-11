import EditProduct from "@/app/ui/dashboard/EditProduct";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  return <EditProduct id={params.id} />;
}
