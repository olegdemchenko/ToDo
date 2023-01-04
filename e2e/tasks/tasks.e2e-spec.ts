import * as request from 'supertest';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { TasksController } from '../../src/modules/tasks/tasks.controller';
import { TasksService } from '../../src/modules/tasks/tasks.service';

describe('tasks module', () => {
  interface Task {
    _id: string;
    description: string;
    active: boolean;
    userId: string;
  }
  let app: INestApplication;

  const testTask: Task = {
    _id: '0',
    description: 'testTask for user1',
    userId: 'user1',
    active: true,
  };

  class MockTasksModel {
    private tasks: Task[];
    constructor() {
      this.tasks = [
        testTask,
        { ...testTask, description: 'testTask for user2', userId: 'user2' },
      ];
    }

    async find({ userId }: { userId: string }) {
      return this.tasks.filter((task) => userId === task.userId);
    }

    async findById(id: string) {
      return this.tasks.find(({ _id }) => id === _id);
    }

    async create(taskDto: Omit<Task, '_id'>) {
      const task = { ...taskDto, _id: String(Math.random()) };
      this.tasks.push(task);
      return task;
    }

    async findByIdAndDelete(id: string) {
      const deleteTaskIndex = this.tasks.findIndex(({ _id }) => _id === id);
      this.tasks.splice(deleteTaskIndex, 1);
      return this.tasks;
    }

    async findByIdAndUpdate(id: string, payload: Omit<Task, '_id'>) {
      const updatedTask = { ...payload, _id: id };
      const updateTaskIndex = this.tasks.findIndex(({ _id }) => _id === id);
      this.tasks.splice(updateTaskIndex, 1, updatedTask);
      return updatedTask;
    }
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        { provide: 'TASK_MODEL', useClass: MockTasksModel },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = { userId: testTask.userId, username: 'fakeuser' };
          return true;
        },
      })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should return all tasks that belong to a specific user', () => {
    return request(app.getHttpServer()).get('/tasks/').expect(200, [testTask]);
  });

  it('should save a task', async () => {
    const res = await request(app.getHttpServer())
      .post('/tasks/')
      .send(testTask);
    expect(res.status).toBe(201);
    expect(res.body.description).toBe(testTask.description);
    expect(res.body.active).toBe(testTask.active);
  });

  it('should get a certain task', async () => {
    const res = await request(app.getHttpServer()).get(
      `/tasks/${testTask._id}`,
    );
    expect(res.status).toBe(200);
    expect(res.body.description).toBe(testTask.description);
    expect(res.body.active).toBe(testTask.active);
  });

  it('should delete a task', async () => {
    return request(app.getHttpServer())
      .delete(`/tasks/${testTask._id}`)
      .expect(200, []);
  });

  it('should update a task', async () => {
    const res = await request(app.getHttpServer())
      .patch('/tasks/')
      .send({ ...testTask, active: false });
    expect(res.status).toBe(200);
    expect(res.body.active).toBeFalsy();
  });

  afterEach(async () => {
    await app.close();
  });
});
