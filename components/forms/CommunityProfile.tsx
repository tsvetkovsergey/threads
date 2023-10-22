'use client';

import { CommunityValidation } from '@/lib/validations/community';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '../ui/button';
import { z } from 'zod';
import {
  updateClerkOrganization,
  updateCommunityInfo,
} from '@/lib/actions/community.actions';
import { useRouter } from 'next/navigation';

interface Props {
  community: {
    _id: string;
    id: string;
    name: string;
    username: string;
    image: string;
    bio: string;
    createdBy: {
      _id: string;
      id: string;
      name: string;
      username: string;
      onboarded: boolean;
      threads: string[];
      bio: string;
      communities: string[];
      image: string;
    };
    threads: string[];
    members: {
      _id: string;
      id: string;
      name: string;
      username: string;
      image: string;
    }[];
  };
}

export default function CommunityProfile({ community }: Props) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(CommunityValidation),
    defaultValues: {
      name: community?.name || '',
      bio: community?.bio || '',
    },
  });

  async function onSubmit(values: z.infer<typeof CommunityValidation>) {
    // Update community
    await updateCommunityInfo({
      communityId: community.id,
      name: values.name,
      username: community.username,
      image: community.image,
      bio: values.bio,
      path: `/communities/${community.id}`,
    });

    // Update Clerk community
    await updateClerkOrganization(community.id, values.name);

    router.back();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10 mt-10"
      >
        {/* NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* BIO */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Save
        </Button>
      </form>
    </Form>
  );
}
