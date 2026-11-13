
"use client";

import { useState, type FormEvent } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Event } from "@/app/types/types";
import { SelectContent, SelectItem, SelectValue,Select, SelectTrigger } from "@/components/ui/select";


interface EditEventProps {
  event: Event;
}

const EditEvent = ({ event }: EditEventProps) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: event.title,
    category: event.category,
    location: event.location,
    date: event.date,
    time: event.time,
    description: event.description,
    image: event.image,
    participants: event.participants,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/events/${event._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update event");
      }

      toast.success("Event updated successfully!");

      window.location.reload();

    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update event");
    } finally {
      setLoading(false);
    }
    console.log(formData,"from editForm");
  };

  return (
    <Dialog>
      <DialogTrigger
  render={
    <Button variant="outline">
      <Pencil className="mr-2 h-4 w-4" />
      Edit Event
    </Button>
  }
/>

      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">

        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>
            Update your event information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <FieldGroup>

            <Field>
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Field>

            {/* <Field>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </Field> */}

          <Field>
  <Label htmlFor="category">Category</Label>

  <Select
    value={formData.category}
    onValueChange={(value)=>{
  if(!value) return;
  
  setFormData((prev)=>({
    ...prev,
    category:value,
  }))
    }
    }
  >
    <SelectTrigger id="category" className="w-full">
      <SelectValue placeholder="Select a category" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="Education">Education</SelectItem>
      <SelectItem value="Health">Health</SelectItem>
      <SelectItem value="Environment">Environment</SelectItem>
      <SelectItem value="Community">Community</SelectItem>
      <SelectItem value="Technology">Technology</SelectItem>
      <SelectItem value="Other">Other</SelectItem>
    </SelectContent>
  </Select>
</Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </Field>
            </div>

            <Field>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <Label htmlFor="participants">Participants</Label>
              <Input
                id="participants"
                name="participants"
                type="number"
                min="0"
                value={formData.participants}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Field>

          </FieldGroup>

          <DialogFooter className="mt-6">
          <DialogClose
  render={
    <Button type="button" variant="outline">
      Cancel
    </Button>
  }
/>

            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  );
};

export default EditEvent;
