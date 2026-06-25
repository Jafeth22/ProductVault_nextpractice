"use client";

import { useState } from "react";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  IconButton,
  Input,
  InputGroup,
  Portal,
  Stack,
  createOverlay,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

import Products from "@services/products.service";
import { IProducts } from "@/types/products";
import { HiPlusSm } from "react-icons/hi";

interface ContactFormProps {
  title?: string;
}

type ProductFormState = {
  title: string;
  price: string;
  description: string;
  discountPercentage: string;
  stock: string;
  tags: string;
  brand: string;
  availabilityStatus: string;
};

const initialFormState: ProductFormState = {
  title: "",
  price: "",
  description: "",
  discountPercentage: "",
  stock: "",
  tags: "",
  brand: "",
  availabilityStatus: "",
};

const NewProductDialog = createOverlay<ContactFormProps>((props) => {
  const { title, ...rest } = props;
  const [form, setForm] = useState<ProductFormState>(initialFormState);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (product: IProducts) => Products().addNewProduct(product),
    onSuccess: () => {
      props.onOpenChange?.({ open: false });
      setForm(initialFormState);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const parseNumber = (value: string) =>
    value.trim() === "" ? 0 : Number(value);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newProduct: IProducts = {
      title: form.title.trim(),
      price: parseNumber(form.price),
      description: form.description.trim(),
      discountPercentage: parseNumber(form.discountPercentage),
      stock: parseNumber(form.stock),
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      brand: form.brand.trim(),
      availabilityStatus: form.availabilityStatus.trim(),
    };

    await mutateAsync(newProduct);
  };

  return (
    <Dialog.Root {...rest} placement="center" scrollBehavior="inside">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {title && (
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Header>
            )}
            <Dialog.Body>
              <form onSubmit={handleSubmit}>
                <Stack gap="4">
                  <Field.Root required>
                    <Field.Label>
                      Product Title <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      name="title"
                      value={form.title}
                      onChange={handleInputChange}
                      placeholder="Product Title"
                      variant="flushed"
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      Product Price <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement="$" endElement="USD">
                      <Input
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleInputChange}
                        placeholder="1000"
                        min="0"
                        step="0.01"
                        variant="flushed"
                      />
                    </InputGroup>
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      Product Description <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      name="description"
                      value={form.description}
                      onChange={handleInputChange}
                      placeholder="Product Description"
                      variant="flushed"
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      Product Discount <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement="%">
                      <Input
                        name="discountPercentage"
                        type="number"
                        value={form.discountPercentage}
                        onChange={handleInputChange}
                        placeholder="10"
                        min="0"
                        step="0.01"
                        variant="flushed"
                      />
                    </InputGroup>
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      Product in stock <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      name="stock"
                      type="number"
                      value={form.stock}
                      onChange={handleInputChange}
                      placeholder="1000"
                      min="0"
                      variant="flushed"
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      Product Tags <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      name="tags"
                      value={form.tags}
                      onChange={handleInputChange}
                      placeholder="Tag1, Tag2, Tag3"
                      variant="flushed"
                    />
                    <Field.HelperText>Separated by commas</Field.HelperText>
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      Product Brand <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      name="brand"
                      value={form.brand}
                      onChange={handleInputChange}
                      placeholder="Product Brand"
                      variant="flushed"
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      Product Availability Status <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      name="availabilityStatus"
                      value={form.availabilityStatus}
                      onChange={handleInputChange}
                      placeholder="In Stock"
                      variant="flushed"
                    />
                  </Field.Root>

                  <Button type="submit" loading={isPending}>
                    Add New Product
                  </Button>
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
  <IconButton
    aria-label="Create New Product"
    size="md"
    px="2"
    gap={1}
    onClick={() =>
      NewProductDialog.open("NewProductDialog", {
        title: "Creating New Product",
      })
    }
  >
    <HiPlusSm /> Create New Product
  </IconButton>
);

export default NewProductDialog;
export { OpenProductDialog };
