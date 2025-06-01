import EditProduct from "@/app/ui/dashboard/EditProduct";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <EditProduct id={(await params).id} />;
}
