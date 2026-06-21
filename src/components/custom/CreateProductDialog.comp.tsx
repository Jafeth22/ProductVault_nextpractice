"use client";

import {
  Button,
  Dialog,
  Input,
  Portal,
  Stack,
  createOverlay,
} from "@chakra-ui/react";
import Products from "@services/products.service";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface ContactFormProps {
  title?: string;
}

const NewProductDialog = createOverlay<ContactFormProps>((props) => {
  const { title, ...rest } = props;
  const [titleProd, setTitleProd] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [tags, setTags] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [availabilityStatus, setAvailabilityStatus] = useState<string>("");

  const clearForm = () => {
    setTitleProd("");
    setPrice(0);
    setDescription("");
    setDiscountPercentage(0);
    setStock(0);
    setTags("");
    setBrand("");
    setAvailabilityStatus("");
  };

  /**
   * it also return mutate, but it is not async
   */
  const { mutateAsync } = useMutation({
    mutationFn: () =>
      Products().addNewProduct({
        title: titleProd,
        price,
        description,
        discountPercentage,
        stock,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
        brand,
        availabilityStatus,
      }),
    onSuccess: (data) => {
      console.log(["New Product created, client data", data]);
      props.onOpenChange?.({ open: false });
      clearForm();
    },
  });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await mutateAsync();
    console.log("Created product:", data);
  };

  return (
    <Dialog.Root {...rest}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {title && (
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
            )}
            <Dialog.Body>
              <form onSubmit={handleSubmit}>
                <Stack gap="4">
                  <Input
                    value={titleProd}
                    onChange={(e) => setTitleProd(e.target.value)}
                    placeholder="Product Title"
                  />
                  <Input
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="Product Price $"
                  />
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Product Description"
                  />
                  <Input
                    value={discountPercentage}
                    onChange={(e) =>
                      setDiscountPercentage(Number(e.target.value))
                    }
                    placeholder="Product Discount %"
                  />
                  <Input
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    placeholder="Number in stock"
                  />
                  <Input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Product Tags (comma separated)"
                  />
                  <Input
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Product Brand"
                  />
                  <Input
                    value={availabilityStatus}
                    onChange={(e) => setAvailabilityStatus(e.target.value)}
                    placeholder="Product Availability Status"
                  />
                  <Button type="submit">Submit</Button>
                </Stack>
              </form>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

const OpenProductDialog = () => (
  <Button
    onClick={() =>
      NewProductDialog.open("NewProductDialog", {
        title: "Creating New Product",
      })
    }
  >
    Create New Product
  </Button>
);

export default NewProductDialog;
export { OpenProductDialog };
